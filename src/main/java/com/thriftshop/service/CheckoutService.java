package com.thriftshop.service;

import com.thriftshop.dao.OrderDao;
import com.thriftshop.dao.ProductDao;
import com.thriftshop.exception.OutOfStockException;
import com.thriftshop.exception.ValidationException;
import com.thriftshop.model.*;
import com.thriftshop.service.payment.*;
import com.thriftshop.service.shipping.*;

import java.io.IOException;
import java.time.Instant;
import java.util.*;

public class CheckoutService {
    private final ProductDao productDao;
    private final OrderDao orderDao;

    private final Map<String, ShippingStrategy> shipping = new HashMap<>();
    private final Map<String, PaymentStrategy> payment = new HashMap<>();

    public CheckoutService(ProductDao productDao, OrderDao orderDao) {
        this.productDao = productDao;
        this.orderDao = orderDao;

        // Register strategies (polymorphism)
        register(new StandardShipping());
        register(new ExpressShipping());
        register(new PickupShipping());

        register(new CardPayment());
        register(new FpxPayment());
        register(new CodPayment());
    }

    private void register(ShippingStrategy s) { shipping.put(s.id(), s); }
    private void register(PaymentStrategy p) { payment.put(p.id(), p); }

    public List<Map<String, Object>> listShippingMethods() {
        List<Map<String, Object>> out = new ArrayList<>();
        for (ShippingStrategy s : shipping.values()) {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("id", s.id());
            row.put("label", s.label());
            out.add(row);
        }
        // Deterministic order
        out.sort(Comparator.comparing(x -> (String) x.get("id")));
        return out;
    }

    public List<Map<String, Object>> listPaymentMethods() {
        List<Map<String, Object>> out = new ArrayList<>();
        for (PaymentStrategy p : payment.values()) {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("id", p.id());
            row.put("label", p.label());
            out.add(row);
        }
        out.sort(Comparator.comparing(x -> (String) x.get("id")));
        return out;
    }

    public Order placeOrder(Cart cart, Address addr, String shippingMethod, String paymentMethod, PaymentInput payIn)
            throws IOException {

        validateAddress(addr);
        if (cart.getItems().isEmpty()) throw new ValidationException("Cart is empty");

        ShippingStrategy ship = shipping.get(shippingMethod);
        if (ship == null) throw new ValidationException("Invalid shipping method");

        PaymentStrategy pay = payment.get(paymentMethod);
        if (pay == null) throw new ValidationException("Invalid payment method");

        // Re-check stock from source-of-truth (CSV)
        for (CartItem it : cart.getItems()) {
            Product p = productDao.findById(it.getProductId());
            if (p == null) throw new ValidationException("Product not found: " + it.getProductId());
            if (it.getQty() > p.getStock()) throw new OutOfStockException("Out of stock: " + p.getName());
        }

        // Build order
        Order o = new Order();
        o.setOrderId(generateOrderId());
        o.setCreatedAt(Instant.now());
        o.setShippingAddress(addr);
        o.setShippingMethod(shippingMethod);
        o.setShippingFee(ship.fee(cart));
        o.setPaymentMethod(paymentMethod);

        double subtotal = 0.0;
        for (CartItem it : cart.getItems()) {
            subtotal += it.lineTotal();
            o.addItem(new OrderItem(it.getProductId(), it.getName(), it.getPrice(), it.getQty(), it.getSize()));
        }
        o.setSubtotal(subtotal);
        o.setTotal(subtotal + o.getShippingFee());

        // Simulate payment
        PaymentResult pr = pay.pay(o, payIn);
        if (!pr.isSuccess()) throw new ValidationException("Payment failed");

        // Persist + decrease inventory
        orderDao.save(o);
        for (CartItem it : cart.getItems()) {
            Product p = productDao.findById(it.getProductId());
            int newStock = Math.max(0, p.getStock() - it.getQty());
            productDao.updateStock(it.getProductId(), newStock);
        }

        // Clear cart
        cart.clear();

        return o;
    }

    private String generateOrderId() {
        return "ORD-" + System.currentTimeMillis();
    }

    private void validateAddress(Address a) {
        if (a == null) throw new ValidationException("Missing shipping details");
        req(a.getFullName(), "Full name");
        req(a.getPhone(), "Phone");
        req(a.getEmail(), "Email");
        req(a.getAddress1(), "Address line 1");
        req(a.getCity(), "City");
        req(a.getState(), "State");
        req(a.getPostcode(), "Postcode");
        req(a.getCountry(), "Country");
    }

    private void req(String v, String label) {
        if (v == null || v.trim().isEmpty()) throw new ValidationException(label + " is required");
    }
}

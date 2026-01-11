package com.thriftshop.web;

import com.thriftshop.dao.OrderDao;
import com.thriftshop.dao.ProductDao;
import com.thriftshop.exception.OutOfStockException;
import com.thriftshop.exception.ValidationException;
import com.thriftshop.model.Address;
import com.thriftshop.model.Cart;
import com.thriftshop.model.Order;
import com.thriftshop.service.CheckoutService;
import com.thriftshop.service.ReceiptWriter;
import com.thriftshop.service.payment.PaymentInput;
import com.thriftshop.util.JsonUtil;
import com.thriftshop.util.RequestUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class OrdersServlet extends CartServlet {
    private CheckoutService checkout;
    private ReceiptWriter receiptWriter;

    @Override
    public void init() throws ServletException {
        checkout = new CheckoutService(new ProductDao(getServletContext()), new OrderDao(getServletContext()));
        receiptWriter = new ReceiptWriter(getServletContext());
    }

    // POST /api/orders (application/x-www-form-urlencoded)
    // Required fields: shippingMethod, paymentMethod, fullName, phone, email, address1, city, state, postcode, country
    // Optional: address2
    // Card fields if paymentMethod=card: cardName, cardNumber, expiry, cvc
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Map<String, String> body = RequestUtil.parseUrlEncodedBody(req);

            Address a = new Address();
            a.setFullName(body.get("fullName"));
            a.setPhone(body.get("phone"));
            a.setEmail(body.get("email"));
            a.setAddress1(body.get("address1"));
            a.setAddress2(body.getOrDefault("address2", ""));
            a.setCity(body.get("city"));
            a.setState(body.get("state"));
            a.setPostcode(body.get("postcode"));
            a.setCountry(body.getOrDefault("country", "Malaysia"));

            String shippingMethod = body.getOrDefault("shippingMethod", "standard");
            String paymentMethod = body.getOrDefault("paymentMethod", "card");

            PaymentInput pin = new PaymentInput();
            pin.setCardName(body.get("cardName"));
            pin.setCardNumber(body.get("cardNumber"));
            pin.setExpiry(body.get("expiry"));
            pin.setCvc(body.get("cvc"));

            Cart cart = getOrCreateCart(req);
            Order o = checkout.placeOrder(cart, a, shippingMethod, paymentMethod, pin);

            // Demonstrate server-side output: generate receipt text file
            receiptWriter.writeReceipt(o);

            Map<String, Object> out = new LinkedHashMap<>();
            out.put("orderId", o.getOrderId());
            out.put("status", o.getStatus().name());
            out.put("subtotal", o.getSubtotal());
            out.put("shippingFee", o.getShippingFee());
            out.put("total", o.getTotal());

            sendJson(resp, 200, JsonUtil.obj(out));
        } catch (ValidationException | OutOfStockException e) {
            sendError(resp, 400, e.getMessage());
        } catch (Exception e) {
            sendError(resp, 500, "Server error: " + e.getMessage());
        }
    }
}

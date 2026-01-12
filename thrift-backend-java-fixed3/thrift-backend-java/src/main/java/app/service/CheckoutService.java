package app.service;

import app.repo.OrderRepository;
import domain.Cart;
import domain.CartItem;
import domain.Order;
import domain.OrderItem;
import domain.Promotion;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CheckoutService {
    private final OrderRepository orderRepo;
    private final PromotionService promoService;
    private final CartService cartService;

    public CheckoutService(OrderRepository orderRepo, PromotionService promoService, CartService cartService) {
        this.orderRepo = orderRepo;
        this.promoService = promoService;
        this.cartService = cartService;
    }

    public Order checkout(String userId) {
        Cart cart = cartService.getCart(userId);
        double subtotal = cart.subtotal();

        // Processing: free shipping eligibility
        Promotion promo = promoService.get();
        boolean freeShipping = subtotal >= promo.getFreeShippingThreshold();
        double shippingFee = freeShipping ? 0.0 : 8.0; // demo
        double total = round2(subtotal + shippingFee);

        // Convert cart items to order items (composition)
        List<OrderItem> items = new ArrayList<>();
        for (CartItem ci : cart.getItems()) {
            items.add(new OrderItem(ci.getProductId(), ci.getTitle(), ci.getPrice(), ci.getQty()));
        }

        String orderId = "TFS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Order order = new Order(orderId, userId, LocalDateTime.now(), items, total);

        // Output (file I/O)
        orderRepo.save(order);

        // Clear cart
        cartService.clear(userId);

        return order;
    }

    private static double round2(double x) {
        return Math.round(x * 100.0) / 100.0;
    }
}

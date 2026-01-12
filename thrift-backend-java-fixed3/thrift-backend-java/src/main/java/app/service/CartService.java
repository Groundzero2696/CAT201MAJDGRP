package app.service;

import domain.Cart;
import domain.CartItem;

import java.util.*;

public class CartService {
    // In-memory cart store per user (demo)
    private final Map<String, Cart> carts = new HashMap<>();

    public Cart getCart(String userId) {
        return carts.computeIfAbsent(userId, k -> new Cart());
    }

    public void add(String userId, String productId, String title, double price) {
        Cart cart = getCart(userId);
        for (CartItem it : cart.getItems()) {
            if (it.getProductId().equals(productId)) {
                it.setQty(it.getQty() + 1);
                return;
            }
        }
        cart.getItems().add(new CartItem(productId, title, price, 1));
    }

    public void setQty(String userId, String productId, int qty) {
        Cart cart = getCart(userId);
        Iterator<CartItem> it = cart.getItems().iterator();
        while (it.hasNext()) {
            CartItem ci = it.next();
            if (ci.getProductId().equals(productId)) {
                if (qty <= 0) it.remove();
                else ci.setQty(qty);
                return;
            }
        }
    }

    public void remove(String userId, String productId) {
        setQty(userId, productId, 0);
    }

    public void clear(String userId) {
        getCart(userId).getItems().clear();
    }
}

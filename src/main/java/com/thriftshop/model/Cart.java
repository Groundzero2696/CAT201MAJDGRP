package com.thriftshop.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Cart {
    private final List<CartItem> items = new ArrayList<>();

    public List<CartItem> getItems() {
        return Collections.unmodifiableList(items);
    }

    public void clear() { items.clear(); }

    public double subtotal() {
        double s = 0.0;
        for (CartItem it : items) s += it.lineTotal();
        return s;
    }

    public CartItem findByProductId(String productId) {
        for (CartItem it : items) {
            if (it.getProductId().equals(productId)) return it;
        }
        return null;
    }

    public void upsert(CartItem item) {
        CartItem existing = findByProductId(item.getProductId());
        if (existing == null) {
            items.add(item);
        } else {
            existing.setQty(item.getQty());
            existing.setSize(item.getSize());
            existing.setStock(item.getStock());
        }
    }

    public void remove(String productId) {
        items.removeIf(it -> it.getProductId().equals(productId));
    }
}

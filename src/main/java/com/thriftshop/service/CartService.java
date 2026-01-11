package com.thriftshop.service;

import com.thriftshop.exception.OutOfStockException;
import com.thriftshop.model.Cart;
import com.thriftshop.model.CartItem;
import com.thriftshop.model.Product;

public class CartService {

    public void addOrUpdate(Cart cart, Product p, int qty, String size) {
        if (qty < 1) qty = 1;
        if (qty > p.getStock()) throw new OutOfStockException("Requested quantity exceeds stock");

        CartItem it = cart.findByProductId(p.getId());
        if (it == null) {
            cart.upsert(new CartItem(p.getId(), p.getName(), p.getPrice(), size, qty, p.getStock(), p.getImageUrl()));
        } else {
            it.setQty(qty);
            it.setSize(size);
            it.setStock(p.getStock());
        }
    }

    public void remove(Cart cart, String productId) {
        cart.remove(productId);
    }
}

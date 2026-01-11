package com.thriftshop.service.shipping;

import com.thriftshop.model.Cart;

public class StandardShipping implements ShippingStrategy {
    public String id() { return "standard"; }
    public String label() { return "Standard (3–5 business days)"; }
    public double fee(Cart cart) { return cart.getItems().isEmpty() ? 0.0 : 8.0; }
}

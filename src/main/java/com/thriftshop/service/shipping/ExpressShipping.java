package com.thriftshop.service.shipping;

import com.thriftshop.model.Cart;

public class ExpressShipping implements ShippingStrategy {
    public String id() { return "express"; }
    public String label() { return "Express (1–2 business days)"; }
    public double fee(Cart cart) { return cart.getItems().isEmpty() ? 0.0 : 15.0; }
}

package com.thriftshop.service.shipping;

import com.thriftshop.model.Cart;

public class PickupShipping implements ShippingStrategy {
    public String id() { return "pickup"; }
    public String label() { return "Self pickup"; }
    public double fee(Cart cart) { return 0.0; }
}

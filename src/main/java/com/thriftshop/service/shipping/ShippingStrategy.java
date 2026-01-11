package com.thriftshop.service.shipping;

import com.thriftshop.model.Cart;

public interface ShippingStrategy {
    String id();
    String label();
    double fee(Cart cart);
}

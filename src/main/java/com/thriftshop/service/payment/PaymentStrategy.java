package com.thriftshop.service.payment;

import com.thriftshop.model.Order;

public interface PaymentStrategy {
    String id();
    String label();
    PaymentResult pay(Order order, PaymentInput input);
}

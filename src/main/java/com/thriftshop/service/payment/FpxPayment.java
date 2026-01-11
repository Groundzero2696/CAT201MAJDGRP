package com.thriftshop.service.payment;

import com.thriftshop.model.Order;

public class FpxPayment implements PaymentStrategy {
    public String id() { return "fpx"; }
    public String label() { return "FPX / Online Banking"; }

    public PaymentResult pay(Order order, PaymentInput input) {
        // Simulated FPX.
        String ref = "PAY-FPX-" + System.currentTimeMillis();
        return new PaymentResult(true, ref);
    }
}

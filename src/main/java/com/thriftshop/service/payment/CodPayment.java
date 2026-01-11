package com.thriftshop.service.payment;

import com.thriftshop.model.Order;

public class CodPayment implements PaymentStrategy {
    public String id() { return "cod"; }
    public String label() { return "Cash on Delivery"; }

    public PaymentResult pay(Order order, PaymentInput input) {
        // COD is "always successful" at checkout time.
        String ref = "PAY-COD-" + System.currentTimeMillis();
        return new PaymentResult(true, ref);
    }
}

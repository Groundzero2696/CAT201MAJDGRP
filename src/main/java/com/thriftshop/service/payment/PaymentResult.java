package com.thriftshop.service.payment;

public class PaymentResult {
    private final boolean success;
    private final String reference;

    public PaymentResult(boolean success, String reference) {
        this.success = success;
        this.reference = reference;
    }

    public boolean isSuccess() { return success; }
    public String getReference() { return reference; }
}

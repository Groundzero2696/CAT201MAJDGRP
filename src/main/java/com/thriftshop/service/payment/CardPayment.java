package com.thriftshop.service.payment;

import com.thriftshop.exception.ValidationException;
import com.thriftshop.model.Order;

public class CardPayment implements PaymentStrategy {
    public String id() { return "card"; }
    public String label() { return "Card (Visa/Mastercard)"; }

    public PaymentResult pay(Order order, PaymentInput input) {
        // Simulated validation (NO real payment gateway).
        if (input == null) throw new ValidationException("Missing card details");
        if (isBlank(input.getCardName())) throw new ValidationException("Card name is required");
        if (!digitsOnly(input.getCardNumber(), 13, 19)) throw new ValidationException("Card number must be 13–19 digits");
        if (isBlank(input.getExpiry())) throw new ValidationException("Expiry is required");
        if (!digitsOnly(input.getCvc(), 3, 4)) throw new ValidationException("CVC must be 3–4 digits");

        String ref = "PAY-CARD-" + System.currentTimeMillis();
        return new PaymentResult(true, ref);
    }

    private boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
    private boolean digitsOnly(String s, int min, int max) {
        if (s == null) return false;
        String t = s.replaceAll("\\s", "");
        if (t.length() < min || t.length() > max) return false;
        for (int i = 0; i < t.length(); i++) if (!Character.isDigit(t.charAt(i))) return false;
        return true;
    }
}

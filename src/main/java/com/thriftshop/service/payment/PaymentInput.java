package com.thriftshop.service.payment;

public class PaymentInput {
    // Only used when paymentMethod=card; for FPX/COD you can ignore these fields.
    private String cardName;
    private String cardNumber;
    private String expiry;
    private String cvc;

    public String getCardName() { return cardName; }
    public void setCardName(String cardName) { this.cardName = cardName; }

    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public String getExpiry() { return expiry; }
    public void setExpiry(String expiry) { this.expiry = expiry; }

    public String getCvc() { return cvc; }
    public void setCvc(String cvc) { this.cvc = cvc; }
}

package com.thriftshop.model;

public class OrderItem {
    private String productId;
    private String name;
    private double price;
    private int qty;
    private String size;

    public OrderItem() {}

    public OrderItem(String productId, String name, double price, int qty, String size) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.qty = qty;
        this.size = size;
    }

    public double lineTotal() { return price * qty; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
}

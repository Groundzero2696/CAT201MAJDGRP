package com.thriftshop.model;

public class CartItem {
    private String productId;
    private String name;
    private double price;
    private String size;
    private int qty;
    private int stock;
    private String imageUrl;

    public CartItem() {}

    public CartItem(String productId, String name, double price, String size, int qty, int stock, String imageUrl) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.size = size;
        this.qty = qty;
        this.stock = stock;
        this.imageUrl = imageUrl;
    }

    public double lineTotal() { return price * qty; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}

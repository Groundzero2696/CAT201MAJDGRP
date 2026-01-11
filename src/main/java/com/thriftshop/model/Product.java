package com.thriftshop.model;

public class Product {
    private String id;
    private String name;
    private double price;
    private String condition; // thrift-specific: Like New / Good / Fair
    private String size;
    private int stock;
    private String imageUrl;

    public Product() {}

    public Product(String id, String name, double price, String condition, String size, int stock, String imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.condition = condition;
        this.size = size;
        this.stock = stock;
        this.imageUrl = imageUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}

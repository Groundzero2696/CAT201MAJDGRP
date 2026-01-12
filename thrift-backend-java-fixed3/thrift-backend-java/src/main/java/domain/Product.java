package domain;

public class Product {
    private final String id;
    private final String title;
    private final String brand;
    private final double price;
    private final String category;
    private final String subcategory;
    private final String condition;
    private final boolean inStock;

    public Product(String id, String title, String brand, double price,
                   String category, String subcategory, String condition, boolean inStock) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.price = price;
        this.category = category;
        this.subcategory = subcategory;
        this.condition = condition;
        this.inStock = inStock;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getBrand() { return brand; }
    public double getPrice() { return price; }
    public String getCategory() { return category; }
    public String getSubcategory() { return subcategory; }
    public String getCondition() { return condition; }
    public boolean isInStock() { return inStock; }
}

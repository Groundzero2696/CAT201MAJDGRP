package domain;

public class OrderItem {
    private final String productId;
    private final String title;
    private final double price;
    private final int qty;

    public OrderItem(String productId, String title, double price, int qty) {
        this.productId = productId;
        this.title = title;
        this.price = price;
        this.qty = qty;
    }

    public String getProductId() { return productId; }
    public String getTitle() { return title; }
    public double getPrice() { return price; }
    public int getQty() { return qty; }

    public double lineTotal() { return price * qty; }
}

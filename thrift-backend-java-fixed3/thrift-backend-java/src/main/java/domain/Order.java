package domain;

import java.time.LocalDateTime;
import java.util.List;

public class Order {
    private final String id;
    private final String userId;
    private final LocalDateTime createdAt;
    private final List<OrderItem> items;
    private final double total;

    public Order(String id, String userId, LocalDateTime createdAt, List<OrderItem> items, double total) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.items = items;
        this.total = total;
    }

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItem> getItems() { return items; }
    public double getTotal() { return total; }
}

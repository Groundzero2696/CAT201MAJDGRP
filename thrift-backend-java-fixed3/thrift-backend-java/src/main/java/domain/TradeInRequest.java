package domain;

import java.time.LocalDateTime;

public class TradeInRequest {
    private final String id;
    private final String userId;
    private final String category;
    private final String notes;
    private TradeInStatus status;
    private final LocalDateTime createdAt;

    public TradeInRequest(String id, String userId, String category, String notes, TradeInStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.category = category;
        this.notes = notes;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getCategory() { return category; }
    public String getNotes() { return notes; }
    public TradeInStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setStatus(TradeInStatus status) { this.status = status; }
}

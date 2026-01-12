package app.service;

import app.repo.TradeInRepository;
import domain.TradeInRequest;
import domain.TradeInStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class TradeInService {
    private final TradeInRepository repo;

    public TradeInService(TradeInRepository repo) { this.repo = repo; }

    public TradeInRequest submit(String userId, String category, String notes) {
        // Processing: create request ID and initial status
        String id = "TI-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        TradeInRequest t = new TradeInRequest(id, userId, category, notes, TradeInStatus.SUBMITTED, LocalDateTime.now());

        // Output: save to file
        repo.save(t);
        return t;
    }

    public List<TradeInRequest> list(String userId) {
        return repo.listByUser(userId);
    }
}

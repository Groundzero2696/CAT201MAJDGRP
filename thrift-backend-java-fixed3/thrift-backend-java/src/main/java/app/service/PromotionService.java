package app.service;

import app.repo.PromotionRepository;
import domain.Promotion;

public class PromotionService {
    private final PromotionRepository repo;
    private Promotion cached;

    public PromotionService(PromotionRepository repo) {
        this.repo = repo;
        this.cached = repo.load();
    }

    public Promotion get() {
        // Reload could be added; for demo, keep in memory
        return cached;
    }

    public void update(String announcement, double threshold) {
        cached.setAnnouncement(announcement);
        cached.setFreeShippingThreshold(threshold);
        repo.save(cached);
    }
}

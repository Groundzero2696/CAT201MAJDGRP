package app.repo;

import domain.Promotion;

import java.nio.file.*;

public class PromotionRepository {
    private final Path path;

    public PromotionRepository(String filePath) {
        this.path = Paths.get(filePath);
        try {
            Files.createDirectories(path.getParent());
            if (!Files.exists(path)) {
                Files.writeString(path, "Free delivery above RM80|80\n");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Promotion load() {
        try {
            String line = Files.readString(path).trim();
            if (line.isEmpty()) return new Promotion("Free delivery above RM80", 80);
            String[] parts = line.split("\\|");
            String announcement = parts.length > 0 ? parts[0] : "Free delivery above RM80";
            double threshold = parts.length > 1 ? Double.parseDouble(parts[1]) : 80;
            return new Promotion(announcement, threshold);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void save(Promotion promo) {
        try {
            String line = promo.getAnnouncement() + "|" + promo.getFreeShippingThreshold() + "\n";
            Files.writeString(path, line, StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.CREATE);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

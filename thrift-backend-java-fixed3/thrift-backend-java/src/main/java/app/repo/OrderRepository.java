package app.repo;

import domain.Order;

import java.nio.file.*;
import java.util.*;

public class OrderRepository {
    private final Path path;

    public OrderRepository(String filePath) {
        this.path = Paths.get(filePath);
        try {
            Files.createDirectories(path.getParent());
            if (!Files.exists(path)) Files.createFile(path);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void save(Order order) {
        // Line storage: orderId|userId|createdAt|total
        String line = order.getId() + "|" + order.getUserId() + "|" + order.getCreatedAt() + "|" + order.getTotal() + "\n";
        try {
            Files.writeString(path, line, StandardOpenOption.APPEND);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<String> listByUser(String userId) {
        try {
            List<String> all = Files.readAllLines(path);
            List<String> out = new ArrayList<>();
            for (String line : all) {
                if (line.trim().isEmpty()) continue;
                String[] parts = line.split("\\|");
                if (parts.length >= 2 && parts[1].equals(userId)) out.add(line);
            }
            return out;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

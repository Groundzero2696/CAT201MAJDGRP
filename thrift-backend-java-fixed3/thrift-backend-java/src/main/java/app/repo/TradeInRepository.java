package app.repo;

import domain.TradeInRequest;
import domain.TradeInStatus;

import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;

public class TradeInRepository {
    private final Path path;

    public TradeInRepository(String filePath) {
        this.path = Paths.get(filePath);
        try {
            Files.createDirectories(path.getParent());
            if (!Files.exists(path)) Files.createFile(path);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void save(TradeInRequest t) {
        // Line storage: id|userId|category|status|createdAt|notes
        String safeNotes = t.getNotes() == null ? "" : t.getNotes().replace("\n", " ").replace("|", "/");
        String line = t.getId() + "|" + t.getUserId() + "|" + t.getCategory() + "|" + t.getStatus()
            + "|" + t.getCreatedAt() + "|" + safeNotes + "\n";
        try {
            Files.writeString(path, line, StandardOpenOption.APPEND);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<TradeInRequest> listByUser(String userId) {
        try {
            List<String> all = Files.readAllLines(path);
            List<TradeInRequest> out = new ArrayList<>();
            for (String line : all) {
                if (line.trim().isEmpty()) continue;
                String[] parts = line.split("\\|", -1);
                if (parts.length < 6) continue;
                if (!parts[1].equals(userId)) continue;

                TradeInRequest t = new TradeInRequest(
                    parts[0], parts[1], parts[2],
                    parts[5],
                    TradeInStatus.valueOf(parts[3]),
                    LocalDateTime.parse(parts[4])
                );
                out.add(t);
            }
            return out;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

package app.repo;

import domain.Product;

import java.nio.file.*;
import java.util.*;

public class ProductRepository {
    private final Path path;
    private final List<Product> products = new ArrayList<>();

    public ProductRepository(String filePath) {
        this.path = Paths.get(filePath);
        load();
    }

    private void load() {
        try {
            if (!Files.exists(path)) throw new RuntimeException("Missing products file: " + path);
            List<String> lines = Files.readAllLines(path);
            for (String line : lines) {
                if (line.trim().isEmpty()) continue;
                // id|title|brand|price|category|subcategory|condition|inStock
                String[] p = line.split("\\|");
                if (p.length < 8) continue;
                Product prod = new Product(
                    p[0], p[1], p[2], Double.parseDouble(p[3]),
                    p[4], p[5], p[6], Boolean.parseBoolean(p[7])
                );
                products.add(prod);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<Product> getAll() {
        return new ArrayList<>(products);
    }

    public Product getById(String id) {
        for (Product p : products) {
            if (p.getId().equals(id)) return p;
        }
        return null;
    }
}

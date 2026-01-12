package app.service;

import app.repo.ProductRepository;
import domain.Product;

import java.util.*;
import java.util.stream.Collectors;

public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) { this.repo = repo; }

    public List<Product> query(String category, String subcategory, String q, String sort) {
        List<Product> list = repo.getAll();

        if (category != null && !category.isEmpty()) {
            list = list.stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }

        if (subcategory != null && !subcategory.isEmpty()) {
            list = list.stream()
                    .filter(p -> p.getSubcategory().equalsIgnoreCase(subcategory))
                    .collect(Collectors.toList());
        }

        if (q != null && !q.isEmpty()) {
            String needle = q.toLowerCase();
            list = list.stream()
                    .filter(p ->
                            p.getTitle().toLowerCase().contains(needle) ||
                            p.getBrand().toLowerCase().contains(needle) ||
                            p.getCondition().toLowerCase().contains(needle))
                    .collect(Collectors.toList());
        }

        if ("price_asc".equals(sort)) {
            list.sort(Comparator.comparingDouble(Product::getPrice));
        } else if ("price_desc".equals(sort)) {
            list.sort((a, b) -> Double.compare(b.getPrice(), a.getPrice()));
        } else if ("new".equals(sort)) {
            // No createdAt in seed file; keep as-is for now (frontend "new" can be based on badge later)
        }

        return list;
    }

    public Product getById(String id) {
        return repo.getById(id);
    }
}

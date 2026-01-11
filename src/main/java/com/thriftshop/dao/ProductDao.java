package com.thriftshop.dao;

import com.thriftshop.model.Product;

import javax.servlet.ServletContext;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class ProductDao {
    private final ServletContext ctx;

    public ProductDao(ServletContext ctx) {
        this.ctx = ctx;
    }

    private File productsFile() {
        String real = ctx.getRealPath("/WEB-INF/data/products.csv");
        return new File(real);
    }

    public synchronized List<Product> findAll() throws IOException {
        List<Product> out = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(productsFile()), StandardCharsets.UTF_8))) {
            br.readLine(); // skip header
            String line;
            while ((line = br.readLine()) != null) {
                String[] a = splitCsv(line);
                if (a.length < 7) continue;
                out.add(new Product(
                        a[0], a[1],
                        Double.parseDouble(a[2]),
                        a[3], a[4],
                        Integer.parseInt(a[5]),
                        a[6]
                ));
            }
        }
        return out;
    }

    public synchronized Product findById(String id) throws IOException {
        for (Product p : findAll()) {
            if (p.getId().equals(id)) return p;
        }
        return null;
    }

    public synchronized void updateStock(String productId, int newStock) throws IOException {
        List<Product> all = findAll();
        boolean found = false;
        for (Product p : all) {
            if (p.getId().equals(productId)) {
                p.setStock(newStock);
                found = true;
                break;
            }
        }
        if (!found) return;
        writeAll(all);
    }

    private void writeAll(List<Product> all) throws IOException {
        File f = productsFile();
        try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(f, false), StandardCharsets.UTF_8))) {
            bw.write("id,name,price,condition,size,stock,imageUrl\n");
            for (Product p : all) {
                bw.write(csv(p.getId()) + "," + csv(p.getName()) + "," + p.getPrice() + "," + csv(p.getCondition()) + ","
                        + csv(p.getSize()) + "," + p.getStock() + "," + csv(p.getImageUrl()) + "\n");
            }
        }
    }

    private String csv(String s) {
        if (s == null) return "";
        String t = s.replace("\"", "\"\"");
        if (t.contains(",") || t.contains("\"") || t.contains("\n")) return "\"" + t + "\"";
        return t;
    }

    // Minimal CSV split (supports quoted values)
    private String[] splitCsv(String line) {
        List<String> cols = new ArrayList<>();
        StringBuilder cur = new StringBuilder();
        boolean inQ = false;
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '"') {
                if (inQ && i + 1 < line.length() && line.charAt(i + 1) == '"') { // escaped quote
                    cur.append('"'); i++;
                } else {
                    inQ = !inQ;
                }
            } else if (c == ',' && !inQ) {
                cols.add(cur.toString());
                cur.setLength(0);
            } else {
                cur.append(c);
            }
        }
        cols.add(cur.toString());
        return cols.toArray(new String[0]);
    }
}

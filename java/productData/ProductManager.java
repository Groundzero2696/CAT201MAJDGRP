package productData;

import tools.jackson.databind.ObjectMapper;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ProductManager {

    private List<Product> products = new ArrayList<>();
    private static final String FILE_PATH = "products.json";

    public void addProduct(Product product) {
        products.add(product);
        saveProductsToFile();
    }

    public void removeProduct(Product product) {
        products.remove(product);
        saveProductsToFile();
    }

    public void updateProduct(Product product, Product newProduct) {
        int index = products.indexOf(product);
        if (index >= 0) {
            products.set(index, newProduct);
            saveProductsToFile();
        }
    }

    public List<Product> getProducts() {
        return this.products;
    }

    public void saveProductsToFile() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(new File(FILE_PATH), products);
    }

    public void loadProductsFromFile() {
        ObjectMapper objectMapper = new ObjectMapper();
        File file = new File(FILE_PATH);
        if (file.exists()) {
            products = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Product.class));
        }
    }
}

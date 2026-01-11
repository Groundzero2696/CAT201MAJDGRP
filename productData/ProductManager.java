package productData;
import java.util.ArrayList;

public class ProductManager {
    private final ArrayList<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
    }

    public void removeProduct(Product product) {
        products.remove(product);
    }

    public void updateProduct(Product product, Product newProduct) {
        int index = products.indexOf(product);
        products.set(index, newProduct);
    }

    public void soldProduct(Product product) {
        products.remove(product);
    }

    public ArrayList<Product> getProducts() {
        return this.products;
    }
}

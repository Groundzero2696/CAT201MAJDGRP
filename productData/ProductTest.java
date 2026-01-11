package productData;
public class ProductTest {
    public static void main(String[] args) {

        ProductManager manager = new ProductManager();

        ProductLoader.load(manager);

        System.out.println("Products in the system:");
        for (Product product : manager.getProducts()) {
            System.out.println(product);
            System.out.println("----");
        }

        Product firstProduct = manager.getProducts().get(0);
        firstProduct.increaseQuantity();
        firstProduct.setDescription("Updated description for the product.");
        manager.updateProduct(firstProduct, firstProduct);

        System.out.println("Products after update:");
        for (Product product : manager.getProducts()) {
            System.out.println(product);
            System.out.println("----");
        }

        Product productToRemove = manager.getProducts().get(1);
        manager.removeProduct(productToRemove);

        System.out.println("Products after removal:");
        for (Product product : manager.getProducts()) {
            System.out.println(product);
            System.out.println("----");
        }
    }
}

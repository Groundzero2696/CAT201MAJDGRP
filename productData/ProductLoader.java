package productData;

public class ProductLoader {
    public static void load(ProductManager manager) {
        manager.addProduct(new Product( "Simon & Garfunkel / The Beatles Song Book",82.00, null, "Discover the enchanting melodies of Simon & Garfunkel and The Beatles, beautifully arranged and performed in this timeless vinyl collection.", 1));
        manager.addProduct(new Product("The Beatles / Abbey Road", 100.00, 90.00, "A classic Beatles album, remastered and reissued for audiophiles.", 1));
        manager.addProduct(new Product());
    }
}

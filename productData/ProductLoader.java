package productData;

public class ProductLoader {

    public static void load(ProductManager manager) {
        // Adding a Book type product
        manager.addProduct(new Book("Simon & Garfunkel / The Beatles Song Book", 82.00, null,
                "Discover the enchanting melodies of Simon & Garfunkel and The Beatles, beautifully arranged and performed in this timeless vinyl collection.",
                1, "Simon & Garfunkel & The Beatles", 150));

        // Adding another Book type product
        manager.addProduct(new Book("The Beatles / Abbey Road", 100.00, 90.00,
                "A classic Beatles album, remastered and reissued for audiophiles.",
                1, "The Beatles", 10));

        // Adding a Clothing product
        manager.addProduct(new Clothing("T-shirt", 20.00, 15.00,
                "Comfortable cotton t-shirt", 200, "M", "Red"));

        // Adding a Toy product
        manager.addProduct(new Toy("Lego Set", 150.00, 120.00,
                "Build your own Lego city", 50, "6-12 years", true));

        // Adding an Accessory product
        manager.addProduct(new Accessory("Watch", 200.00, 180.00,
                "Stylish leather strap watch", 30, "Leather", "Rolex"));

        // Adding a generic Product using the default constructor
        manager.addProduct(new Product()); // This will use the default constructor
    }
}

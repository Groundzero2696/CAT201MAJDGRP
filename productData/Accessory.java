package productData;

public class Accessory extends Product {

    private String material;
    private String brand;

    public Accessory(String title, double oldPrice, Double newPrice, String description, int quantity, String material, String brand) {
        super(title, oldPrice, newPrice, description, quantity, "Accessory");
        this.material = material;
        this.brand = brand;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public String toString() {
        return super.toString() +
                "\nMaterial: " + material +
                "\nBrand: " + brand;
    }
}

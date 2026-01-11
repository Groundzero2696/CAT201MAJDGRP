package productData;
public class Clothing extends Product {

    private String size;
    private String color;

    public Clothing(String id,String title, double oldPrice, Double newPrice, String description, int quantity, String size, String color) {
        super(id,title, oldPrice, newPrice, description, quantity, "Clothing");
        this.size = size;
        this.color = color;
    }

    public Clothing(String title, double oldPrice, Double newPrice, String description, int quantity, String size, String color) {
        super(title, oldPrice, newPrice, description, quantity, "Clothing");
        this.size = size;
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return super.toString() +
                "\nSize: " + size +
                "\nColor: " + color;
    }
}
package productData;
public class Product {

    private String title;
    private double oldPrice;
    private Double newPrice;
    private String description;
    private int quantity;

    // Constructor
    public Product (){
        this.title = "Product name";
        this.oldPrice = 0.0;
        this.newPrice = null;
        this.description = "Lorem ipsum dolor sit amet consectetur adipiscing elit.";
        this.quantity = 0;
    }
    public Product(String title, double oldPrice, Double newPrice, String description, int quantity) {
        this.title = title;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
        this.description = description;
        this.quantity = quantity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(double oldPrice) {
        this.oldPrice = oldPrice;
    }

    public Double getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(Double newPrice) {
        this.newPrice = newPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        if (quantity > 0) {
            this.quantity = quantity;
        }
    }

    public void increaseQuantity() {
        this.quantity++;
    }

    public void decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    @Override
    public String toString() {

        return "Product: " + title +
                "\nOld Price: RM" + oldPrice +
                "\nDescription: " + description +
                "\nQuantity: " + quantity;
    }
}

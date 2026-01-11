package productData;

public class Toy extends Product {

    private String ageGroup;
    private boolean isBatteryOperated;

    public Toy(String id,String title, double oldPrice, Double newPrice, String description, int quantity, String ageGroup, boolean isBatteryOperated) {
        super(id,title, oldPrice, newPrice, description, quantity, "Toy");
        this.ageGroup = ageGroup;
        this.isBatteryOperated = isBatteryOperated;
    }
    public Toy(String title, double oldPrice, Double newPrice, String description, int quantity, String ageGroup, boolean isBatteryOperated) {
        super(title, oldPrice, newPrice, description, quantity, "Toy");
        this.ageGroup = ageGroup;
        this.isBatteryOperated = isBatteryOperated;
    }
    public String getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public boolean isBatteryOperated() {
        return isBatteryOperated;
    }

    public void setBatteryOperated(boolean batteryOperated) {
        isBatteryOperated = batteryOperated;
    }

    @Override
    public String toString() {
        return super.toString() +
                "\nAge Group: " + ageGroup +
                "\nBattery Operated: " + isBatteryOperated;
    }
}
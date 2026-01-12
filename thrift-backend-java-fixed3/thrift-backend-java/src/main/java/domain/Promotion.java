package domain;

public class Promotion {
    private String announcement;
    private double freeShippingThreshold;

    public Promotion(String announcement, double freeShippingThreshold) {
        this.announcement = announcement;
        this.freeShippingThreshold = freeShippingThreshold;
    }

    public String getAnnouncement() { return announcement; }
    public double getFreeShippingThreshold() { return freeShippingThreshold; }

    public void setAnnouncement(String announcement) { this.announcement = announcement; }
    public void setFreeShippingThreshold(double t) { this.freeShippingThreshold = t; }
}

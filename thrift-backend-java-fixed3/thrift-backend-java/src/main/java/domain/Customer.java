package domain;

public class Customer extends User {
    private double credits;

    public Customer(String id, String name, String email, double credits) {
        super(id, name, email);
        this.credits = credits;
    }

    @Override
    public String getRole() { return "customer"; }

    public double getCredits() { return credits; }
    public void addCredits(double amount) { this.credits += amount; }
}

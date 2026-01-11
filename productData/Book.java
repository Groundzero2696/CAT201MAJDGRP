package productData;

import java.util.UUID;

public class Book extends Product {

    private String author;
    private int pages;

    public Book(UUID id, String title, double oldPrice, Double newPrice, String description, int quantity, String author, int pages) {
        super(id,title, oldPrice, newPrice, description, quantity, "Book");
        this.author = author;
        this.pages = pages;
    }

    public Book(String title, double oldPrice, Double newPrice, String description, int quantity, String author, int pages) {
        super(title, oldPrice, newPrice, description, quantity, "Book");
        this.author = author;
        this.pages = pages;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    @Override
    public String toString() {
        return super.toString() +
                "\nAuthor: " + author +
                "\nPages: " + pages;
    }
}

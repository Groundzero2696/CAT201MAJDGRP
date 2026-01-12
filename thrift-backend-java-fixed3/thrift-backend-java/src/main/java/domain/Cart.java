package domain;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private final List<CartItem> items = new ArrayList<>();

    public List<CartItem> getItems() { return items; }

    public double subtotal() {
        double s = 0;
        for (CartItem it : items) s += it.lineTotal();
        return Math.round(s * 100.0) / 100.0;
    }
}

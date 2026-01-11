package com.thriftshop.dao;

import com.thriftshop.model.Order;
import com.thriftshop.model.OrderItem;

import javax.servlet.ServletContext;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class OrderDao {
    private final ServletContext ctx;

    public OrderDao(ServletContext ctx) {
        this.ctx = ctx;
    }

    private File ordersFile() {
        return new File(ctx.getRealPath("/WEB-INF/data/orders.csv"));
    }
    private File orderItemsFile() {
        return new File(ctx.getRealPath("/WEB-INF/data/order_items.csv"));
    }

    public synchronized void save(Order o) throws IOException {
        // Append order
        try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(ordersFile(), true), StandardCharsets.UTF_8))) {
            String createdAt = DateTimeFormatter.ISO_OFFSET_DATE_TIME.withZone(ZoneId.systemDefault()).format(o.getCreatedAt());
            bw.write(csv(o.getOrderId()) + "," + csv(createdAt) + "," + csv(o.getStatus().name()) + "," +
                    csv(o.getShippingAddress().getFullName()) + "," + csv(o.getShippingAddress().getPhone()) + "," +
                    csv(o.getShippingAddress().getEmail()) + "," + csv(o.getShippingAddress().getAddress1()) + "," +
                    csv(o.getShippingAddress().getAddress2()) + "," + csv(o.getShippingAddress().getCity()) + "," +
                    csv(o.getShippingAddress().getState()) + "," + csv(o.getShippingAddress().getPostcode()) + "," +
                    csv(o.getShippingAddress().getCountry()) + "," + csv(o.getShippingMethod()) + "," + o.getShippingFee() + "," +
                    csv(o.getPaymentMethod()) + "," + o.getSubtotal() + "," + o.getTotal() + "\n");
        }

        // Append items
        try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(orderItemsFile(), true), StandardCharsets.UTF_8))) {
            for (OrderItem it : o.getItems()) {
                bw.write(csv(o.getOrderId()) + "," + csv(it.getProductId()) + "," + csv(it.getName()) + "," +
                        it.getPrice() + "," + it.getQty() + "," + csv(it.getSize()) + "," + it.lineTotal() + "\n");
            }
        }
    }

    private String csv(String s) {
        if (s == null) return "";
        String t = s.replace("\"", "\"\"");
        if (t.contains(",") || t.contains("\"") || t.contains("\n")) return "\"" + t + "\"";
        return t;
    }
}

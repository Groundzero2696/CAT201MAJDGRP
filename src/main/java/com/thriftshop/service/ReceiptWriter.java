package com.thriftshop.service;

import com.thriftshop.model.Order;
import com.thriftshop.model.OrderItem;

import javax.servlet.ServletContext;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class ReceiptWriter {
    private final ServletContext ctx;

    public ReceiptWriter(ServletContext ctx) { this.ctx = ctx; }

    public void writeReceipt(Order o) throws IOException {
        File dir = new File(ctx.getRealPath("/WEB-INF/receipts"));
        if (!dir.exists()) dir.mkdirs();

        File out = new File(dir, "receipt_" + o.getOrderId() + ".txt");
        try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(out, false), StandardCharsets.UTF_8))) {
            bw.write("ThriftStore Receipt\n");
            bw.write("Order: " + o.getOrderId() + "\n");
            bw.write("Status: " + o.getStatus().name() + "\n\n");

            bw.write("Ship to: " + o.getShippingAddress().getFullName() + "\n");
            bw.write(o.getShippingAddress().getAddress1() + "\n");
            if (o.getShippingAddress().getAddress2() != null && !o.getShippingAddress().getAddress2().trim().isEmpty()) {
                bw.write(o.getShippingAddress().getAddress2() + "\n");
            }
            bw.write(o.getShippingAddress().getPostcode() + " " + o.getShippingAddress().getCity() + ", " + o.getShippingAddress().getState() + "\n");
            bw.write(o.getShippingAddress().getCountry() + "\n\n");

            bw.write("Items:\n");
            for (OrderItem it : o.getItems()) {
                bw.write("- " + it.getName() + " (" + it.getSize() + ") x" + it.getQty() + " = " + it.lineTotal() + "\n");
            }
            bw.write("\nSubtotal: " + o.getSubtotal() + "\n");
            bw.write("Shipping: " + o.getShippingFee() + "\n");
            bw.write("Total: " + o.getTotal() + "\n");
        }
    }
}

package app.http;

import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class HttpUtil {

    public static void addCors(HttpExchange ex) {
        ex.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        ex.getResponseHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
        ex.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
    }

    public static boolean handleOptions(HttpExchange ex) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(ex.getRequestMethod())) {
            addCors(ex);
            ex.sendResponseHeaders(204, -1);
            ex.close();
            return true;
        }
        return false;
    }

    public static String readBody(HttpExchange ex) throws IOException {
        try (InputStream in = ex.getRequestBody()) {
            return new String(in.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    public static void send(HttpExchange ex, int status, String json) throws IOException {
        addCors(ex);
        ex.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        ex.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = ex.getResponseBody()) {
            os.write(bytes);
        }
    }

    public static String errorJson(String msg) {
        return "{\"error\":\"" + Json.escape(msg) + "\"}";
    }

    public static String okJson(String msg) {
        return "{\"ok\":true,\"message\":\"" + Json.escape(msg) + "\"}";
    }

    // Simple JSON builders (manual; no libs)
    public static String productsToJson(List<domain.Product> products) {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"items\":[");
        for (int i = 0; i < products.size(); i++) {
            domain.Product p = products.get(i);
            if (i > 0) sb.append(",");
            sb.append(productToJsonObject(p));
        }
        sb.append("]}");
        return sb.toString();
    }

    public static String productToJsonObject(domain.Product p) {
        return "{"
            + "\"id\":\"" + Json.escape(p.getId()) + "\","
            + "\"title\":\"" + Json.escape(p.getTitle()) + "\","
            + "\"brand\":\"" + Json.escape(p.getBrand()) + "\","
            + "\"price\":" + p.getPrice() + ","
            + "\"category\":\"" + Json.escape(p.getCategory()) + "\","
            + "\"subcategory\":\"" + Json.escape(p.getSubcategory()) + "\","
            + "\"condition\":\"" + Json.escape(p.getCondition()) + "\","
            + "\"inStock\":" + p.isInStock()
            + "}";
    }

    public static String cartToJson(domain.Cart cart) {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"items\":[");
        List<domain.CartItem> items = cart.getItems();
        for (int i = 0; i < items.size(); i++) {
            domain.CartItem it = items.get(i);
            if (i > 0) sb.append(",");
            sb.append("{")
              .append("\"id\":\"").append(Json.escape(it.getProductId())).append("\",")
              .append("\"title\":\"").append(Json.escape(it.getTitle())).append("\",")
              .append("\"price\":").append(it.getPrice()).append(",")
              .append("\"qty\":").append(it.getQty())
              .append("}");
        }
        sb.append("],")
          .append("\"subtotal\":").append(cart.subtotal())
          .append("}");
        return sb.toString();
    }
}

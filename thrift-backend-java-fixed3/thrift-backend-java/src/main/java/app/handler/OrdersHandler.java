package app.handler;

import app.http.HttpUtil;
import app.http.Query;
import app.repo.OrderRepository;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.List;

public class OrdersHandler implements HttpHandler {
    private final OrderRepository repo;

    public OrdersHandler(OrderRepository repo) { this.repo = repo; }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if (!"GET".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        Query q = Query.parse(ex.getRequestURI().getRawQuery());
        String userId = q.get("userId");
        if (userId == null || userId.isEmpty()) userId = "demo";

        List<String> orders = repo.listByUser(userId);

        StringBuilder sb = new StringBuilder();
        sb.append("{\"items\":[");
        for (int i = 0; i < orders.size(); i++) {
            if (i > 0) sb.append(",");
            String line = orders.get(i);
            // orderId|userId|createdAt|total
            String[] parts = line.split("\\|");
            String id = parts.length > 0 ? parts[0] : "";
            String createdAt = parts.length > 2 ? parts[2] : "";
            String total = parts.length > 3 ? parts[3] : "0";
            sb.append("{")
              .append("\"id\":\"").append(app.http.Json.escape(id)).append("\",")
              .append("\"createdAt\":\"").append(app.http.Json.escape(createdAt)).append("\",")
              .append("\"total\":").append(total)
              .append("}");
        }
        sb.append("]}");

        HttpUtil.send(ex, 200, sb.toString());
    }
}

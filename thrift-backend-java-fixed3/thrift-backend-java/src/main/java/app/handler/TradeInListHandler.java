package app.handler;

import app.http.HttpUtil;
import app.http.Query;
import app.service.TradeInService;
import domain.TradeInRequest;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.List;

public class TradeInListHandler implements HttpHandler {
    private final TradeInService service;

    public TradeInListHandler(TradeInService service) { this.service = service; }

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

        List<TradeInRequest> list = service.list(userId);

        StringBuilder sb = new StringBuilder();
        sb.append("{\"items\":[");
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) sb.append(",");
            TradeInRequest t = list.get(i);
            sb.append("{")
              .append("\"id\":\"").append(app.http.Json.escape(t.getId())).append("\",")
              .append("\"category\":\"").append(app.http.Json.escape(t.getCategory())).append("\",")
              .append("\"status\":\"").append(t.getStatus()).append("\",")
              .append("\"createdAt\":\"").append(app.http.Json.escape(t.getCreatedAt().toString())).append("\",")
              .append("\"notes\":\"").append(app.http.Json.escape(t.getNotes())).append("\"")
              .append("}");
        }
        sb.append("]}");

        HttpUtil.send(ex, 200, sb.toString());
    }
}

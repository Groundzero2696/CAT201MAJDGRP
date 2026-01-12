package app.handler;

import app.http.HttpUtil;
import app.http.Json;
import app.service.TradeInService;
import domain.TradeInRequest;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.Map;

public class TradeInSubmitHandler implements HttpHandler {
    private final TradeInService service;

    public TradeInSubmitHandler(TradeInService service) { this.service = service; }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if (!"POST".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        String body = HttpUtil.readBody(ex);
        Map<String, String> m = Json.parseFlatObject(body);

        String userId = m.getOrDefault("userId", "demo");
        String category = m.getOrDefault("category", "unknown");
        String notes = m.getOrDefault("notes", "");

        TradeInRequest t = service.submit(userId, category, notes);

        String json = "{"
            + "\"tradeInId\":\"" + app.http.Json.escape(t.getId()) + "\","
            + "\"status\":\"" + t.getStatus() + "\""
            + "}";

        HttpUtil.send(ex, 200, json);
    }
}

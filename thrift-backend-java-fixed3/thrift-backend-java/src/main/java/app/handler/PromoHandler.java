package app.handler;

import app.http.HttpUtil;
import app.service.PromotionService;
import domain.Promotion;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

public class PromoHandler implements HttpHandler {
    private final PromotionService service;

    public PromoHandler(PromotionService service) { this.service = service; }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if (!"GET".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        Promotion p = service.get();
        String json = "{"
            + "\"announcement\":\"" + app.http.Json.escape(p.getAnnouncement()) + "\","
            + "\"freeShippingThreshold\":" + p.getFreeShippingThreshold()
            + "}";
        HttpUtil.send(ex, 200, json);
    }
}

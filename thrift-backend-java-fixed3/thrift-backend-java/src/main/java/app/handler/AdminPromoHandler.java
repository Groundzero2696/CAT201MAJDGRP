package app.handler;

import app.http.HttpUtil;
import app.http.Json;
import app.service.PromotionService;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.Map;

/**
 * Updates promo settings (announcement bar + free shipping threshold).
 * PUT JSON: { "announcement":"...", "freeShippingThreshold":80 }
 */
public class AdminPromoHandler implements HttpHandler {
    private final PromotionService promoService;

    public AdminPromoHandler(PromotionService promoService) { this.promoService = promoService; }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if ("GET".equalsIgnoreCase(ex.getRequestMethod())) {
            // allow admin UI to read promo too
            String json = "{"
                + "\"announcement\":\"" + app.http.Json.escape(promoService.get().getAnnouncement()) + "\","
                + "\"freeShippingThreshold\":" + promoService.get().getFreeShippingThreshold()
                + "}";
            HttpUtil.send(ex, 200, json);
            return;
        }

        if (!"PUT".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        String body = HttpUtil.readBody(ex);
        Map<String, String> m = Json.parseFlatObject(body);

        String announcement = m.getOrDefault("announcement", promoService.get().getAnnouncement());
        String thStr = m.getOrDefault("freeShippingThreshold", String.valueOf(promoService.get().getFreeShippingThreshold()));

        double threshold;
        try {
            threshold = Double.parseDouble(thStr);
        } catch (Exception e) {
            HttpUtil.send(ex, 400, HttpUtil.errorJson("Invalid freeShippingThreshold"));
            return;
        }

        promoService.update(announcement, threshold);
        HttpUtil.send(ex, 200, HttpUtil.okJson("Promo updated"));
    }
}

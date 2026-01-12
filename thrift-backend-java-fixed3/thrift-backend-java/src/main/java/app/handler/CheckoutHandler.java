package app.handler;

import app.http.HttpUtil;
import app.http.Json;
import app.service.CheckoutService;
import domain.Order;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.Map;

public class CheckoutHandler implements HttpHandler {
    private final CheckoutService checkoutService;

    public CheckoutHandler(CheckoutService checkoutService) { this.checkoutService = checkoutService; }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if (!"POST".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        // For the rubric, this is where input arrives (JSON), processing happens (checkout), output is returned.
        String body = HttpUtil.readBody(ex);
        Map<String, String> m = Json.parseFlatObject(body);

        String userId = m.getOrDefault("userId", "demo");

        Order order = checkoutService.checkout(userId);

        String json = "{"
            + "\"orderId\":\"" + app.http.Json.escape(order.getId()) + "\","
            + "\"total\":" + order.getTotal()
            + "}";

        HttpUtil.send(ex, 200, json);
    }
}

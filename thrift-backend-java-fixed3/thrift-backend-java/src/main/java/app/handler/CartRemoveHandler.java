package app.handler;

import app.http.HttpUtil;
import app.http.Json;
import app.service.CartService;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.Map;

public class CartRemoveHandler implements HttpHandler {
    private final CartService cartService;

    public CartRemoveHandler(CartService cartService) { this.cartService = cartService; }

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
        String id = m.get("id");

        if (id == null) {
            HttpUtil.send(ex, 400, HttpUtil.errorJson("Missing fields: userId,id"));
            return;
        }

        cartService.remove(userId, id);
        HttpUtil.send(ex, 200, HttpUtil.okJson("Removed from cart"));
    }
}

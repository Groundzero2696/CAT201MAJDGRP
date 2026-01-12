package app.handler;

import app.http.HttpUtil;
import app.http.Query;
import app.service.CartService;
import domain.Cart;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

public class CartGetHandler implements HttpHandler {
    private final CartService cartService;

    public CartGetHandler(CartService cartService) { this.cartService = cartService; }

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

        Cart cart = cartService.getCart(userId);
        HttpUtil.send(ex, 200, HttpUtil.cartToJson(cart));
    }
}

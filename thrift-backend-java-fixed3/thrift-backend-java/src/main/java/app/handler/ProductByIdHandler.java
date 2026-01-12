package app.handler;

import app.http.HttpUtil;
import app.http.Query;
import app.service.ProductService;
import domain.Product;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

public class ProductByIdHandler implements HttpHandler {
    private final ProductService service;

    public ProductByIdHandler(ProductService service) { this.service = service; }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if (!"GET".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        Query q = Query.parse(ex.getRequestURI().getRawQuery());
        String id = q.get("id");
        if (id == null || id.isEmpty()) {
            HttpUtil.send(ex, 400, HttpUtil.errorJson("Missing query param: id"));
            return;
        }

        Product p = service.getById(id);
        if (p == null) {
            HttpUtil.send(ex, 404, HttpUtil.errorJson("Product not found"));
            return;
        }

        HttpUtil.send(ex, 200, HttpUtil.productToJsonObject(p));
    }
}

package app.handler;

import app.http.HttpUtil;
import app.http.Query;
import app.service.ProductService;
import domain.Product;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.List;

public class ProductsHandler implements HttpHandler {
    private final ProductService service;

    public ProductsHandler(ProductService service) { this.service = service; }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if (!"GET".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        Query q = Query.parse(ex.getRequestURI().getRawQuery());
        List<Product> products = service.query(
            q.get("category"),
            q.get("subcategory"),
            q.get("q"),
            q.get("sort")
        );

        HttpUtil.send(ex, 200, HttpUtil.productsToJson(products));
    }
}

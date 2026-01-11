package com.thriftshop.web;

import com.thriftshop.dao.ProductDao;
import com.thriftshop.model.Product;
import com.thriftshop.service.ProductService;
import com.thriftshop.util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class ProductsServlet extends BaseServlet {
    private ProductService productService;

    @Override
    public void init() throws ServletException {
        productService = new ProductService(new ProductDao(getServletContext()));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        if (id != null && !id.trim().isEmpty()) {
            Product p = productService.getProduct(id);
            if (p == null) {
                sendError(resp, 404, "Product not found");
                return;
            }
            sendJson(resp, 200, JsonUtil.obj(productToMap(p)));
            return;
        }

        List<Product> all = productService.listProducts();
        List<Map<String, Object>> arr = new ArrayList<>();
        for (Product p : all) arr.add(productToMap(p));

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("products", arr);
        sendJson(resp, 200, JsonUtil.obj(out));
    }

    private Map<String, Object> productToMap(Product p) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", p.getId());
        m.put("name", p.getName());
        m.put("price", p.getPrice());
        m.put("condition", p.getCondition());
        m.put("size", p.getSize());
        m.put("stock", p.getStock());
        m.put("imageUrl", p.getImageUrl());
        return m;
    }
}

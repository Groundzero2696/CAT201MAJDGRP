package com.thriftshop.web;

import com.thriftshop.dao.ProductDao;
import com.thriftshop.exception.OutOfStockException;
import com.thriftshop.exception.ValidationException;
import com.thriftshop.model.Cart;
import com.thriftshop.model.Product;
import com.thriftshop.service.CartService;
import com.thriftshop.util.RequestUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class CartItemsServlet extends CartServlet {
    private CartService cartService;
    private ProductDao productDao;

    @Override
    public void init() throws ServletException {
        cartService = new CartService();
        productDao = new ProductDao(getServletContext());
    }

    // POST /api/cart/items  body: productId=...&qty=...&size=...
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Map<String, String> body = RequestUtil.parseUrlEncodedBody(req);
            String productId = body.getOrDefault("productId", "");
            int qty = parseInt(body.get("qty"), 1);
            String size = body.getOrDefault("size", "");

            if (productId.trim().isEmpty()) throw new ValidationException("productId is required");

            Product p = productDao.findById(productId);
            if (p == null) throw new ValidationException("Product not found");

            Cart cart = getOrCreateCart(req);
            cartService.addOrUpdate(cart, p, qty, size);

            // Return full cart state
            super.doGet(req, resp);
        } catch (ValidationException | OutOfStockException e) {
            sendError(resp, 400, e.getMessage());
        }
    }

    // PUT /api/cart/items/{productId} body: qty=...
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String productId = pathId(req);
            if (productId == null) throw new ValidationException("Missing productId in URL");

            Map<String, String> body = RequestUtil.parseUrlEncodedBody(req);
            int qty = parseInt(body.get("qty"), 1);

            Product p = productDao.findById(productId);
            if (p == null) throw new ValidationException("Product not found");

            Cart cart = getOrCreateCart(req);
            cartService.addOrUpdate(cart, p, qty, cart.findByProductId(productId) != null ? cart.findByProductId(productId).getSize() : p.getSize());

            super.doGet(req, resp);
        } catch (ValidationException | OutOfStockException e) {
            sendError(resp, 400, e.getMessage());
        }
    }

    // DELETE /api/cart/items/{productId}
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String productId = pathId(req);
            if (productId == null) throw new ValidationException("Missing productId in URL");

            Cart cart = getOrCreateCart(req);
            cartService.remove(cart, productId);

            super.doGet(req, resp);
        } catch (ValidationException e) {
            sendError(resp, 400, e.getMessage());
        }
    }

    private String pathId(HttpServletRequest req) {
        String pi = req.getPathInfo(); // like /sku-vie-001
        if (pi == null || pi.equals("/") || pi.trim().isEmpty()) return null;
        return pi.startsWith("/") ? pi.substring(1) : pi;
    }

    private int parseInt(String s, int def) {
        try { return Integer.parseInt(s); } catch (Exception e) { return def; }
    }
}

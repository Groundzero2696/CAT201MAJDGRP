package com.thriftshop.web;

import com.thriftshop.model.Cart;
import com.thriftshop.model.CartItem;
import com.thriftshop.util.JsonUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class CartServlet extends BaseServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Cart cart = getOrCreateCart(req);
        List<Map<String, Object>> items = new ArrayList<>();
        for (CartItem it : cart.getItems()) {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("id", it.getProductId()); // align with your React: it.id
            row.put("name", it.getName());
            row.put("price", it.getPrice());
            row.put("size", it.getSize());
            row.put("qty", it.getQty());
            row.put("stock", it.getStock());
            row.put("image", it.getImageUrl()); // align with your React: it.image
            items.add(row);
        }
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("items", items);
        out.put("subtotal", cart.subtotal());
        sendJson(resp, 200, JsonUtil.obj(out));
    }

    protected Cart getOrCreateCart(HttpServletRequest req) {
        Object obj = req.getSession(true).getAttribute(SessionKeys.CART);
        if (obj instanceof Cart cart) return cart;
        Cart cart = new Cart();
        req.getSession(true).setAttribute(SessionKeys.CART, cart);
        return cart;
    }
}

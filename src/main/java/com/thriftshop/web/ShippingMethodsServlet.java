package com.thriftshop.web;

import com.thriftshop.dao.OrderDao;
import com.thriftshop.dao.ProductDao;
import com.thriftshop.service.CheckoutService;
import com.thriftshop.util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class ShippingMethodsServlet extends BaseServlet {
    private CheckoutService checkout;

    @Override
    public void init() throws ServletException {
        checkout = new CheckoutService(new ProductDao(getServletContext()), new OrderDao(getServletContext()));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("shippingMethods", checkout.listShippingMethods());
        sendJson(resp, 200, JsonUtil.obj(out));
    }
}

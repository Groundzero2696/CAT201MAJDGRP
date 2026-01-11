package com.thriftshop.web;

import com.thriftshop.util.JsonUtil;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public abstract class BaseServlet extends HttpServlet {

    protected void sendJson(HttpServletResponse resp, int status, String json) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json; charset=UTF-8");
        resp.getWriter().write(json);
    }

    protected void sendError(HttpServletResponse resp, int status, String message) throws IOException {
        Map<String, Object> e = new LinkedHashMap<>();
        e.put("error", message);
        sendJson(resp, status, JsonUtil.obj(e));
    }
}

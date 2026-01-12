package app.handler;

import app.http.HttpUtil;
import app.http.Json;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.Map;

/**
 * Demo admin login (no database).
 * Accepts JSON: { "email": "...", "password": "..." }
 * Returns: { ok:true, role:"admin" }
 */
public class AdminLoginHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange ex) throws IOException {
        if (HttpUtil.handleOptions(ex)) return;

        if (!"POST".equalsIgnoreCase(ex.getRequestMethod())) {
            HttpUtil.send(ex, 405, HttpUtil.errorJson("Method not allowed"));
            return;
        }

        String body = HttpUtil.readBody(ex);
        Map<String, String> m = Json.parseFlatObject(body);

        String email = m.getOrDefault("email", "");
        String password = m.getOrDefault("password", "");

        // Demo check (replace later with real auth)
        if (email.isEmpty() || password.isEmpty()) {
            HttpUtil.send(ex, 400, HttpUtil.errorJson("Missing email or password"));
            return;
        }

        String json = "{\"ok\":true,\"role\":\"admin\",\"message\":\"Demo admin logged in\"}";
        HttpUtil.send(ex, 200, json);
    }
}

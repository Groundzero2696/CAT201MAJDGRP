package com.thriftshop.util;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class RequestUtil {
    private RequestUtil() {}

    public static Map<String, String> parseUrlEncodedBody(HttpServletRequest req) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = req.getReader()) {
            String line;
            while ((line = br.readLine()) != null) sb.append(line);
        }
        return parseUrlEncoded(sb.toString());
    }

    public static Map<String, String> parseUrlEncoded(String raw) {
        Map<String, String> out = new HashMap<>();
        if (raw == null || raw.trim().isEmpty()) return out;

        String[] pairs = raw.split("&");
        for (String p : pairs) {
            int idx = p.indexOf('=');
            String k = (idx >= 0) ? p.substring(0, idx) : p;
            String v = (idx >= 0) ? p.substring(idx + 1) : "";
            k = urlDecode(k);
            v = urlDecode(v);
            out.put(k, v);
        }
        return out;
    }

    private static String urlDecode(String s) {
        return URLDecoder.decode(s == null ? "" : s, StandardCharsets.UTF_8);
    }
}

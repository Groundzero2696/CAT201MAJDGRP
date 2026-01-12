package app.http;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class Query {
    private final Map<String, String> map = new HashMap<>();

    public static Query parse(String rawQuery) {
        Query q = new Query();
        if (rawQuery == null || rawQuery.isEmpty()) return q;

        String[] pairs = rawQuery.split("&");
        for (String pair : pairs) {
            int eq = pair.indexOf('=');
            String k = eq >= 0 ? pair.substring(0, eq) : pair;
            String v = eq >= 0 ? pair.substring(eq + 1) : "";
            k = urlDecode(k);
            v = urlDecode(v);
            q.map.put(k, v);
        }
        return q;
    }

    private static String urlDecode(String s) {
        return URLDecoder.decode(s, StandardCharsets.UTF_8);
    }

    public String get(String key) {
        return map.get(key);
    }
}

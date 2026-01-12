package app.http;

import java.util.HashMap;
import java.util.Map;

/**
 * Minimal JSON helper for this assignment.
 * - Supports parsing a FLAT JSON object with string/number/boolean fields.
 * - No arrays, no nesting.
 *
 * This avoids external libraries while still demonstrating JSON I/O.
 * Note: This parser is intentionally simple and assumes input values do not contain unescaped commas.
 */
public class Json {

    public static Map<String, String> parseFlatObject(String body) {
        Map<String, String> out = new HashMap<>();
        if (body == null) return out;

        String s = body.trim();
        if (s.isEmpty()) return out;

        if (s.startsWith("{")) s = s.substring(1);
        if (s.endsWith("}")) s = s.substring(0, s.length() - 1);

        s = s.trim();
        if (s.isEmpty()) return out;

        String[] parts = s.split(",");
        for (String part : parts) {
            String p = part.trim();
            if (p.isEmpty()) continue;

            int colon = p.indexOf(':');
            if (colon < 0) continue;

            String key = stripQuotes(p.substring(0, colon).trim());
            String val = p.substring(colon + 1).trim();
            val = stripQuotes(val);

            out.put(key, val);
        }

        return out;
    }

    private static String stripQuotes(String s) {
        String x = s.trim();
        if (x.startsWith("\"") && x.endsWith("\"") && x.length() >= 2) {
            x = x.substring(1, x.length() - 1);
        }

        // Basic unescape for common sequences
        x = x.replace("\\\\", "\\");   // \\  -> \
        x = x.replace("\\\"", "\"");   // \"  -> "
        x = x.replace("\\n", "\n");    // \n  -> newline
        x = x.replace("\\r", "\r");    // \r  -> carriage return
        x = x.replace("\\t", "\t");    // \t  -> tab
        return x;
    }

    public static String escape(String s) {
        if (s == null) return "";
        return s
            .replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\r", "\\r")
            .replace("\n", "\\n")
            .replace("\t", "\\t");
    }
}

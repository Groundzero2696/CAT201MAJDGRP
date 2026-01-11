package com.thriftshop.util;

import java.util.List;
import java.util.Map;

public class JsonUtil {
    private JsonUtil() {}

    public static String escape(String s) {
        if (s == null) return "";
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '\\': out.append("\\\\"); break;
                case '"': out.append("\\\""); break;
                case '\n': out.append("\\n"); break;
                case '\r': out.append("\\r"); break;
                case '\t': out.append("\\t"); break;
                default: out.append(c);
            }
        }
        return out.toString();
    }

    public static String obj(Map<String, Object> m) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        boolean first = true;
        for (Map.Entry<String, Object> e : m.entrySet()) {
            if (!first) sb.append(",");
            first = false;
            sb.append("\"").append(escape(e.getKey())).append("\":");
            sb.append(val(e.getValue()));
        }
        sb.append("}");
        return sb.toString();
    }

    public static String arr(List<?> list) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(val(list.get(i)));
        }
        sb.append("]");
        return sb.toString();
    }

    @SuppressWarnings("unchecked")
    public static String val(Object v) {
        if (v == null) return "null";
        if (v instanceof String string) return "\"" + escape(string) + "\"";
        if (v instanceof Number) return v.toString();
        if (v instanceof Boolean boolean1) return boolean1 ? "true" : "false";
        if (v instanceof Map) return obj((Map<String, Object>) v);
        if (v instanceof List<?> list) return arr(list);
        return "\"" + escape(String.valueOf(v)) + "\"";
    }
}

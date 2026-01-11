package Servlets;

import productData.Product;
import productData.ProductLoader;
import productData.ProductManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/products")
public class ProductServlet extends HttpServlet {

    private ProductManager productManager;

    @Override
    public void init() throws ServletException {
        productManager = new ProductManager();
        ProductLoader.load(productManager);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        List<Product> productList = productManager.getProducts();

        StringBuilder jsonResponse = new StringBuilder("[");

        for (Product product : productList) {
            jsonResponse.append("{")
                    .append("\"id\":\"").append(product.getId()).append("\",")
                    .append("\"title\":\"").append(product.getTitle()).append("\",")
                    .append("\"author\":\"").append(product.getDescription()).append("\",")
                    .append("\"price\":").append(product.getOldPrice()).append(",")
                    .append("\"newPrice\":").append(product.getNewPrice() != null ? product.getNewPrice() : "null").append(",")
                    .append("\"quantity\":").append(product.getQuantity()).append(",")
                    .append("\"type\":\"").append(product.getType()).append("\",")
                    .append("\"image\":\"images/").append(product.getTitle().replaceAll(" ", "").toLowerCase()).append(".jpg\"")
                    .append("},");
        }

        if (jsonResponse.length() > 1) {
            jsonResponse.deleteCharAt(jsonResponse.length() - 1);
        }

        jsonResponse.append("]");

        out.println(jsonResponse.toString());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}

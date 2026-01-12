package app;

import app.handler.*;
import app.repo.*;
import app.service.*;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;

public class ServerMain {
    public static void main(String[] args) throws Exception {
        int port = 8080;

        // Repositories (file I/O)
        PromotionRepository promoRepo = new PromotionRepository("data/promo.txt");
        ProductRepository productRepo = new ProductRepository("data/products.txt");
        OrderRepository orderRepo = new OrderRepository("data/orders.txt");
        TradeInRepository tradeRepo = new TradeInRepository("data/tradeins.txt");

        // Services (processing)
        PromotionService promoService = new PromotionService(promoRepo);
        ProductService productService = new ProductService(productRepo);
        CartService cartService = new CartService();
        CheckoutService checkoutService = new CheckoutService(orderRepo, promoService, cartService);
        TradeInService tradeInService = new TradeInService(tradeRepo);

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Public
        server.createContext("/api/promo", new PromoHandler(promoService));
        server.createContext("/api/products", new ProductsHandler(productService));
        server.createContext("/api/product", new ProductByIdHandler(productService));

        // Cart
        server.createContext("/api/cart", new CartGetHandler(cartService));
        server.createContext("/api/cart/add", new CartAddHandler(cartService));
        server.createContext("/api/cart/qty", new CartQtyHandler(cartService));
        server.createContext("/api/cart/remove", new CartRemoveHandler(cartService));

        // Checkout & Orders
        server.createContext("/api/checkout", new CheckoutHandler(checkoutService));
        server.createContext("/api/orders", new OrdersHandler(orderRepo));

        // Trade-ins
        server.createContext("/api/tradeins/submit", new TradeInSubmitHandler(tradeInService));
        server.createContext("/api/tradeins", new TradeInListHandler(tradeInService));

        // Admin (demo)
        server.createContext("/api/admin/login", new AdminLoginHandler());
        server.createContext("/api/admin/promo", new AdminPromoHandler(promoService));

        server.setExecutor(null);
        server.start();

        System.out.println("Backend running at http://localhost:" + port);
        System.out.println("Try: http://localhost:" + port + "/api/products");
    }
}

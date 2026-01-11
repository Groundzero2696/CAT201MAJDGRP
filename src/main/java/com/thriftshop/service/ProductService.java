package com.thriftshop.service;

import com.thriftshop.dao.ProductDao;
import com.thriftshop.model.Product;

import java.io.IOException;
import java.util.List;

public class ProductService {
    private final ProductDao dao;

    public ProductService(ProductDao dao) {
        this.dao = dao;
    }

    public List<Product> listProducts() throws IOException {
        return dao.findAll();
    }

    public Product getProduct(String id) throws IOException {
        return dao.findById(id);
    }
}

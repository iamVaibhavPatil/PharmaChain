package com.pharmachain.product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.pharmachain.product.domain.Ingredient;
import com.pharmachain.product.domain.Product;
import com.pharmachain.product.exception.ServiceException;
import com.pharmachain.product.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ProductDataLoader implements ApplicationListener<ContextRefreshedEvent> {
	
	@Autowired
	private ProductService productService;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		try {
			loadProductData();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

	private void loadProductData() throws ServiceException {

		log.info("Product loading started");

		// Product 1
		log.info("Adding product-1 started");
		List<Ingredient> ingredients1 = new ArrayList<Ingredient>();
		Product product1 = new Product();
		product1.setProductName("Codistar Cough Syrup");
		product1.setProductDescription("Codistar Cough Syrup for unproductive dry cough only");
		product1.setCompanyName("Relax Pharmaceuticals Pvt. Ltd.");
		product1.setCategory("SCHEDULE H1");
		product1.setPacking("BOT");
		product1.setStrength("100 ML");
		product1.setPrice("78.00");
		product1.setIsOTCApproved("N");
		ingredients1.add(new Ingredient("Codeine Phosphate", "5 mg"));
		ingredients1.add(new Ingredient("Clorpheniramine Maleate", "4 mg"));
		product1.setIngredients(ingredients1);
		productService.addProduct(product1);
		log.info("Adding product-1 ended");

		// Product 2
		log.info("Adding product-2 started");
		List<Ingredient> ingredients2 = new ArrayList<Ingredient>();
		Product product2 = new Product();
		product2.setProductName("Aciloc 150 MG Tablet");
		product2.setProductDescription("Aciloc 150 MG Tablet is a very effective medicine that is used to reduce the amount of acid produced in the stomach. It is used to treat and prevent stomach acid-related disorders such as heartburn and acid reflux disease.");
		product2.setCompanyName("Cadila Pharmaceuticals Ltd.");
		product2.setCategory("SCHEDULE H");
		product2.setPacking("TAB");
		product2.setStrength("150 MG");
		product2.setPrice("12.00");
		product2.setIsOTCApproved("Y");
		ingredients2.add(new Ingredient("Ranitidine", "150 mg"));
		product2.setIngredients(ingredients2);
		productService.addProduct(product2);
		log.info("Adding product-2 ended");

		log.info("Product loading ended");
	}
}

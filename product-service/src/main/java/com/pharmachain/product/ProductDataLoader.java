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
		product2.setProductName("Aciloc");
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

		// Product 3
		log.info("Adding product-3 started");
		List<Ingredient> ingredients3 = new ArrayList<Ingredient>();
		Product product3 = new Product();
		product3.setProductName("Saridon");
		product3.setProductDescription("Saridon, a mild analgesic, helps in the treatment of fever, headache, pain, febrility and joint pain.");
		product3.setCompanyName("Piramal Enterprises Ltd.");
		product3.setCategory("SCHEDULE H");
		product3.setPacking("TAB");
		product3.setStrength("250 MG");
		product3.setPrice("10.00");
		product3.setIsOTCApproved("Y");
		ingredients3.add(new Ingredient("Paracetamol", "250 mg"));
		ingredients3.add(new Ingredient("Propyphenazone", "150 mg"));
		ingredients3.add(new Ingredient("Caffeine", "50 mg"));
		product3.setIngredients(ingredients3);
		productService.addProduct(product3);
		log.info("Adding product-3 ended");

				
		
		// Product 4
		log.info("Adding product-4 started");
		List<Ingredient> ingredients4 = new ArrayList<Ingredient>();
		Product product4 = new Product();
		product4.setProductName("Betnesol");
		product4.setProductDescription("Betnesol 0.5 MG Tablet is similar to the naturally occurring steroidal hormones produced by the adrenal glands. It is used to treat internal and external swelling associated with diseases like asthma, colitis, arthritis, severe skin allergies etc. It is also used for other conditions like adrenal hormonal insufficiency, certain types of anemia, cerebral edema etc.");
		product4.setCompanyName("Glaxosmithkline Pharmaceuticals Ltd.");
		product4.setCategory("SCHEDULE H");
		product4.setPacking("TAB");
		product4.setStrength("0.5 MG");
		product4.setPrice("25.00");
		product4.setIsOTCApproved("N");
		ingredients4.add(new Ingredient("Metamethasone", "500 mg"));
		ingredients4.add(new Ingredient("Sodium Hydrogen Carbonate", "E500"));
		ingredients4.add(new Ingredient("Erythrosine", "E127"));
		product4.setIngredients(ingredients4);
		productService.addProduct(product4);
		log.info("Adding product-4 ended");

		// Product 5
		log.info("Adding product-5 started");
		List<Ingredient> ingredients5 = new ArrayList<Ingredient>();
		Product product5 = new Product();
		product5.setProductName("Motrin");
		product5.setProductDescription("Motrin IB Ibuprofen for Pain Relief/ Fever Reducer Tablets are designed for temporary relief of minor pain. They can be taken to help headaches, muscular aches, toothaches, backaches and menstrual cramps. This Motrin Pain Reliever tablets also help temporarily reduce fevers.");
		product5.setCompanyName("Abbott Inc.");
		product5.setCategory("NARCOTIC");
		product5.setPacking("TAB");
		product5.setStrength("200 MG");
		product5.setPrice("250.00");
		product5.setIsOTCApproved("N");
		ingredients5.add(new Ingredient("Ibuprofen", "200 mg"));
		ingredients5.add(new Ingredient("Carnauba Wax", "10 mg"));
		ingredients5.add(new Ingredient("Colloidal Silicon Dioxide", "10 mg"));
		ingredients5.add(new Ingredient(" Iron Oxide", "5 mg"));
		product5.setIngredients(ingredients5);
		productService.addProduct(product5);
		log.info("Adding product-5 ended");
		
		log.info("Product loading ended");
	}
}

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
		product1.setProductName("CODISTAR COUGH SYRUP");
		product1.setProductDescription("CODISTAR COUGH SYRUP FOR UNPRODUCTIVE DRY COUGH ONLY");
		product1.setCompanyName("RELAX PHARMACEUTICALS PVT. LTD.");
		product1.setCategory("SCHEDULE H1");
		product1.setPacking("BOT");
		product1.setStrength("100 ML");
		product1.setPrice(7800);
		product1.setIsOTCApproved("N");
		ingredients1.add(new Ingredient("CODEINE PHOSPHATE", "5 MG"));
		ingredients1.add(new Ingredient("CLORPHENIRAMINE MALEATE", "4 MG"));
		product1.setIngredients(ingredients1);
		productService.addProduct(product1);
		log.info("Adding product-1 ended");

		// Product 2
		log.info("Adding product-2 started");
		List<Ingredient> ingredients2 = new ArrayList<Ingredient>();
		Product product2 = new Product();
		product2.setProductName("ACILOC");
		product2.setProductDescription("ACILOC 150 MG TABLET IS A VERY EFFECTIVE MEDICINE THAT IS USED TO REDUCE THE AMOUNT OF ACID PRODUCED IN THE STOMACH. IT IS USED TO TREAT AND PREVENT STOMACH ACID-RELATED DISORDERS SUCH AS HEARTBURN AND ACID REFLUX DISEASE.");
		product2.setCompanyName("CADILA PHARMACEUTICALS LTD.");
		product2.setCategory("SCHEDULE H");
		product2.setPacking("TAB");
		product2.setStrength("150 MG");
		product2.setPrice(1200);
		product2.setIsOTCApproved("Y");
		ingredients2.add(new Ingredient("RANITIDINE", "150 MG"));
		product2.setIngredients(ingredients2);
		productService.addProduct(product2);
		log.info("Adding product-2 ended");

		// Product 3
		log.info("Adding product-3 started");
		List<Ingredient> ingredients3 = new ArrayList<Ingredient>();
		Product product3 = new Product();
		product3.setProductName("SARIDON");
		product3.setProductDescription("SARIDON, A MILD ANALGESIC, HELPS IN THE TREATMENT OF FEVER, HEADACHE, PAIN, FEBRILITY AND JOINT PAIN.");
		product3.setCompanyName("PIRAMAL ENTERPRISES LTD.");
		product3.setCategory("SCHEDULE H");
		product3.setPacking("TAB");
		product3.setStrength("250 MG");
		product3.setPrice(1000);
		product3.setIsOTCApproved("Y");
		ingredients3.add(new Ingredient("PARACETAMOL", "250 MG"));
		ingredients3.add(new Ingredient("PROPYPHENAZONE", "150 MG"));
		ingredients3.add(new Ingredient("CAFFEINE", "50 MG"));
		product3.setIngredients(ingredients3);
		productService.addProduct(product3);
		log.info("Adding product-3 ended");

		// Product 4
		log.info("Adding product-4 started");
		List<Ingredient> ingredients4 = new ArrayList<Ingredient>();
		Product product4 = new Product();
		product4.setProductName("BETNESOL");
		product4.setProductDescription("BETNESOL 0.5 MG TABLET IS SIMILAR TO THE NATURALLY OCCURRING STEROIDAL HORMONES PRODUCED BY THE ADRENAL GLANDS. IT IS USED TO TREAT INTERNAL AND EXTERNAL SWELLING ASSOCIATED WITH DISEASES LIKE ASTHMA, COLITIS, ARTHRITIS, SEVERE SKIN ALLERGIES ETC. IT IS ALSO USED FOR OTHER CONDITIONS LIKE ADRENAL HORMONAL INSUFFICIENCY, CERTAIN TYPES OF ANEMIA, CEREBRAL EDEMA ETC.");
		product4.setCompanyName("GLAXOSMITHKLINE PHARMACEUTICALS LTD.");
		product4.setCategory("SCHEDULE H");
		product4.setPacking("TAB");
		product4.setStrength("0.5 MG");
		product4.setPrice(2500);
		product4.setIsOTCApproved("N");
		ingredients4.add(new Ingredient("METAMETHASONE", "500 MG"));
		ingredients4.add(new Ingredient("SODIUM HYDROGEN CARBONATE", "E500"));
		ingredients4.add(new Ingredient("ERYTHROSINE", "E127"));
		product4.setIngredients(ingredients4);
		productService.addProduct(product4);
		log.info("Adding product-4 ended");

		// Product 5
		log.info("Adding product-5 started");
		List<Ingredient> ingredients5 = new ArrayList<Ingredient>();
		Product product5 = new Product();
		product5.setProductName("MOTRIN");
		product5.setProductDescription("MOTRIN IB IBUPROFEN FOR PAIN RELIEF/ FEVER REDUCER TABLETS ARE DESIGNED FOR TEMPORARY RELIEF OF MINOR PAIN. THEY CAN BE TAKEN TO HELP HEADACHES, MUSCULAR ACHES, TOOTHACHES, BACKACHES AND MENSTRUAL CRAMPS. THIS MOTRIN PAIN RELIEVER TABLETS ALSO HELP TEMPORARILY REDUCE FEVERS.");
		product5.setCompanyName("ABBOTT INC.");
		product5.setCategory("NARCOTIC");
		product5.setPacking("TAB");
		product5.setStrength("200 MG");
		product5.setPrice(25000);
		product5.setIsOTCApproved("N");
		ingredients5.add(new Ingredient("IBUPROFEN", "200 MG"));
		ingredients5.add(new Ingredient("CARNAUBA WAX", "10 MG"));
		ingredients5.add(new Ingredient("COLLOIDAL SILICON DIOXIDE", "10 MG"));
		ingredients5.add(new Ingredient("IRON OXIDE", "5 MG"));
		product5.setIngredients(ingredients5);
		productService.addProduct(product5);
		log.info("Adding product-5 ended");
		
		log.info("Product loading ended");
	}
}

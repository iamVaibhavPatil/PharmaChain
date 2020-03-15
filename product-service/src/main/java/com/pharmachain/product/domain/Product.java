package com.pharmachain.product.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Document(collection = "products")
@Data
@EqualsAndHashCode(callSuper = false)
public class Product extends AuditEntity {

	private static final long serialVersionUID = 1L;

	@Id
	private String productId;
	
	@Indexed
	private String productName;

	private String productDescription;
	private String companyName;
	private String category;
	private String packing;
	private String strength;
	private String price;
	private String isOTCApproved;
	private List<Ingredient> ingredients;
}

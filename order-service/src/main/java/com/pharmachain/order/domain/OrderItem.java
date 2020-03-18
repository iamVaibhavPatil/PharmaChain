package com.pharmachain.order.domain;

import lombok.Data;

@Data
public class OrderItem {
	private String productId;
	private String productName;
	private long price;
	private int quantity;
	private long total;
}

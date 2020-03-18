package com.pharmachain.order.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Document(collection = "orders")
@Data
@EqualsAndHashCode(callSuper = false)
public class Order extends AuditEntity {

	private static final long serialVersionUID = 1L;

	@Id
	private String orderId;
	
	@Indexed
	private String customerId;

	private int totalItems;
	private List<OrderItem> orderItems;
	private String orderIssueDate;
	private long orderAmount;
	private long discount;
	private long totalTax;
	private long shippingCharge;
	private long netPayoutAmount;
	private OrderStatus orderStatus;
}

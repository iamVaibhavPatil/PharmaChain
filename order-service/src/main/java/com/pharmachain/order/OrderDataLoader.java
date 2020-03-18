package com.pharmachain.order;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.pharmachain.order.domain.Order;
import com.pharmachain.order.domain.OrderItem;
import com.pharmachain.order.domain.OrderStatus;
import com.pharmachain.order.exception.ServiceException;
import com.pharmachain.order.service.OrderService;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class OrderDataLoader implements ApplicationListener<ContextRefreshedEvent> {
	
	@Autowired
	private OrderService orderService;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		try {
			loadOrderData();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

	private void loadOrderData() throws ServiceException {

		log.info("Product loading started");

		// Product 1
		log.info("Adding order-1 started");
		List<OrderItem> order1Items = new ArrayList<OrderItem>();
		
		// Order Item - 1
		OrderItem orderItem1 = new OrderItem();
		orderItem1.setProductId("5172bc5a-f807-4ceb-9bf3-4d82ec77b623");
		orderItem1.setProductName("Codistar Cough Syrup");
		orderItem1.setPrice(7800);
		orderItem1.setQuantity(2);
		orderItem1.setTotal(15600);
		
		// Order Item - 2
		OrderItem orderItem2 = new OrderItem();
		orderItem2.setProductId("14bb8752-1aa6-40a7-87d9-c9e17fcd0367");
		orderItem2.setProductName("Saridon");
		orderItem2.setPrice(1000);
		orderItem2.setQuantity(5);
		orderItem2.setTotal(5000);
		
		order1Items.add(orderItem1);
		order1Items.add(orderItem2);

		Order order1 = new Order();
		order1.setCustomerId("da01555c-c4e9-4c4a-9e3b-360ef7a70c62");
		order1.setTotalItems(2);
		order1.setOrderItems(order1Items);
		order1.setOrderIssueDate("03-18-220");
		order1.setOrderAmount(20600);
		order1.setDiscount(0);
		order1.setTotalTax(400);
		order1.setShippingCharge(2500);
		order1.setNetPayoutAmount(23500);
		order1.setOrderStatus(OrderStatus.IN_PROGRESS);

		orderService.createOrder(order1);
		log.info("Adding product-1 ended");
		
		log.info("Product loading ended");
	}
}

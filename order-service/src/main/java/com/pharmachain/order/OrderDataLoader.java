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

		log.info("Order loading started");

		// Order 1
		log.info("Adding order-1 started");
		List<OrderItem> order1Items = new ArrayList<OrderItem>();
		
		// Order1 Item - 1
		OrderItem order1Item1 = new OrderItem();
		order1Item1.setProductId("5172bc5a-f807-4ceb-9bf3-4d82ec77b623");
		order1Item1.setProductName("Codistar Cough Syrup");
		order1Item1.setPrice(7800);
		order1Item1.setQuantity(2);
		order1Item1.setTotal(15600);
		
		// Order1 Item - 2
		OrderItem order1Item2 = new OrderItem();
		order1Item2.setProductId("14bb8752-1aa6-40a7-87d9-c9e17fcd0367");
		order1Item2.setProductName("Saridon");
		order1Item2.setPrice(1000);
		order1Item2.setQuantity(5);
		order1Item2.setTotal(5000);
		
		order1Items.add(order1Item1);
		order1Items.add(order1Item2);

		Order order1 = new Order();
		order1.setCustomerId("da01555c-c4e9-4c4a-9e3b-360ef7a70c62");
		order1.setTotalItems(2);
		order1.setOrderItems(order1Items);
		order1.setOrderIssueDate("03-18-2020");
		order1.setOrderAmount(20600);
		order1.setDiscount(0);
		order1.setTotalTax(400);
		order1.setShippingCharge(2500);
		order1.setNetPayoutAmount(23500);
		order1.setOrderStatus(OrderStatus.IN_PROGRESS);

		orderService.createOrder(order1);
		log.info("Adding order-1 ended");


		// Order 2
		log.info("Adding order-2 started");
		List<OrderItem> order2Items = new ArrayList<OrderItem>();
		
		// Order2 Item - 1
		OrderItem order2Item1 = new OrderItem();
		order2Item1.setProductId("28f7a710-20ed-4f89-854d-0c465591822a");
		order2Item1.setProductName("Motrin");
		order2Item1.setPrice(25000);
		order2Item1.setQuantity(2);
		order2Item1.setTotal(50000);
		
		// Order2 Item - 2
		OrderItem order2Item2 = new OrderItem();
		order2Item2.setProductId("3324ee7d-048d-43b0-a9db-8be7363f9156");
		order2Item2.setProductName("Aciloc");
		order2Item2.setPrice(1200);
		order2Item2.setQuantity(5);
		order2Item2.setTotal(6000);
		
		order2Items.add(order2Item1);
		order2Items.add(order2Item2);

		Order order2 = new Order();
		order2.setCustomerId("da01555c-c4e9-4c4a-9e3b-360ef7a70c62");
		order2.setTotalItems(2);
		order2.setOrderItems(order2Items);
		order2.setOrderIssueDate("03-19-2020");
		order2.setOrderAmount(56000);
		order2.setDiscount(0);
		order2.setTotalTax(4000);
		order2.setShippingCharge(0);
		order2.setNetPayoutAmount(60000);
		order2.setOrderStatus(OrderStatus.COMPLETED);

		orderService.createOrder(order2);
		log.info("Adding order-2 ended");


		// Order 3
		log.info("Adding order-3 started");
		List<OrderItem> order3Items = new ArrayList<OrderItem>();
		
		// Order3 Item - 1
		OrderItem order3Item1 = new OrderItem();
		order3Item1.setProductId("83319773-8482-4750-b678-95bb7e97e423");
		order3Item1.setProductName("Betnesol");
		order3Item1.setPrice(2500);
		order3Item1.setQuantity(2);
		order3Item1.setTotal(5000);
		
		// Order3 Item - 2
		OrderItem order3Item2 = new OrderItem();
		order3Item2.setProductId("5172bc5a-f807-4ceb-9bf3-4d82ec77b623");
		order3Item2.setProductName("Codistar Cough Syrup");
		order3Item2.setPrice(7800);
		order3Item2.setQuantity(2);
		order3Item2.setTotal(15600);
		
		order3Items.add(order3Item1);
		order3Items.add(order3Item2);

		Order order3 = new Order();
		order3.setCustomerId("da01555c-c4e9-4c4a-9e3b-360ef7a70c62");
		order3.setTotalItems(2);
		order3.setOrderItems(order3Items);
		order3.setOrderIssueDate("03-20-2020");
		order3.setOrderAmount(20600);
		order3.setDiscount(0);
		order3.setTotalTax(4000);
		order3.setShippingCharge(0);
		order3.setNetPayoutAmount(21000);
		order3.setOrderStatus(OrderStatus.CANCELLED);

		orderService.createOrder(order3);
		log.info("Adding order-3 ended");

		log.info("Order loading ended");
	}
}

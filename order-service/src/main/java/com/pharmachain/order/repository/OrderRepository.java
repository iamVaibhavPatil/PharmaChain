package com.pharmachain.order.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pharmachain.order.domain.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String>{

	public Optional<Order> findByOrderId(String orderId);

	public void deleteByOrderId(String orderId);
	
	public List<Order> findByCustomerId(String customerId);
}

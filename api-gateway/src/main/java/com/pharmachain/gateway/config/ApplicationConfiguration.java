package com.pharmachain.gateway.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import com.pharmachain.gateway.filter.PreFilter;

@Configuration
public class ApplicationConfiguration {

	@Bean
	public PreFilter preFilter() {
		return new PreFilter();
	}
	
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}

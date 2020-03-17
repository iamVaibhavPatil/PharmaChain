package com.pharmachain.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.pharmachain.gateway.filter.PreFilter;

@Configuration
public class ApplicationConfiguration {

	@Bean
	public PreFilter preFilter() {
		return new PreFilter();
	}
}

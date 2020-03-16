package com.pharmachain.gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@Getter
public class JwtConfiguration {
	
	@Value("${security.jwt.header:Authorization}")
	private String header;
	
	@Value("${security.jwt.prefix:Bearer}")
	private String prefix;
	
	@Value("${security.jwt.expiration:#{20*60*1000}}")
	private int expiration;
	
	@Value("${security.jwt.secret:H8242346ssjdfhk28r9f2jf2c8u98u98uu9fj3rfl036kjrn2sj20kjhrhk27kwlo2e}")
	private String secret;
}

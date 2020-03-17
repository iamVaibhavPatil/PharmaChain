package com.pharmachain.gateway.filter;

import javax.servlet.http.HttpServletRequest;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

import lombok.extern.slf4j.Slf4j;

/*
 * Gateway can send extra parameters in the request header (JWT token, other user information etc.) through custom Zuul Filters.
 * MicroService then can optionally authorize the request & provides the response to the Authentication Gateway.
 * For Authorization, the MicroService would need the JWT access token to be passed to it. 
 * It can then verify the JWT token & extract the user roles from the claims & accordingly allow/deny the request for the concerned endpoint.
 * Using @PreAuthorize("hasRole('ROLE_STORE_ADMIN')") annotations on MicroServices controller methods.
 * 
 * For now we are not enabling as authentication and authorization is at single place on gateway.
 * */

@Slf4j
public class PreFilter extends ZuulFilter {

	@Override
	public boolean shouldFilter() {
		return false; // TODO - Change to true for enabling filter
	}

	@Override
	public Object run() throws ZuulException {
		RequestContext requestContext = RequestContext.getCurrentContext();
		HttpServletRequest request = requestContext.getRequest();
		
		// Add a custom header in the MicroServices request
		requestContext.addZuulRequestHeader("Authorization", request.getHeader("Authorization"));

		log.info(String.format("%s request to %s", request.getMethod(), request.getRequestURL().toString()));
		return null;
	}

	@Override
	public String filterType() {
		return "pre";
	}

	@Override
	public int filterOrder() {
		return 1;
	}
}

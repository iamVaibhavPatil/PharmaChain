package com.pharmachain.gateway.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pharmachain.gateway.config.JwtConfiguration;
import com.pharmachain.gateway.domain.Role;

import io.jsonwebtoken.Claims;

public class JwtAuthFilter extends OncePerRequestFilter {

	private JwtConfiguration jwtConfiguration;
	private JwtTokenProvider jwtTokenProvider;

	public JwtAuthFilter(JwtConfiguration jwtConfiguration, JwtTokenProvider jwtTokenProvider) {
		this.jwtConfiguration = jwtConfiguration;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	@SuppressWarnings("unchecked")
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

		try {
			String jwt = this.getJwtFromRequest(request);
			if(StringUtils.isNotBlank(jwt) && jwtTokenProvider.validateToken(jwt)) {
				String userName = jwtTokenProvider.getUserNameFromToken(jwt);
				Claims claims = jwtTokenProvider.getAllClaimsFromToken(jwt);

				List<String> rolesMap = claims.get("roles", List.class);
				List<Role> roles = new ArrayList<Role>();
				for (String rolemap : rolesMap) {
					roles.add(Role.valueOf(rolemap));
				}
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userName, null, roles.stream().map(r -> new SimpleGrantedAuthority(r.name())).collect(Collectors.toList()));
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(auth);
			}	
		} catch (Exception ex) {
			logger.error("Could not set user authentication in security context", ex);
		}
		filterChain.doFilter(request, response);
	}
	
	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader(jwtConfiguration.getHeader());
		if(StringUtils.isNotBlank(bearerToken) && bearerToken.startsWith(jwtConfiguration.getPrefix())) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}
}

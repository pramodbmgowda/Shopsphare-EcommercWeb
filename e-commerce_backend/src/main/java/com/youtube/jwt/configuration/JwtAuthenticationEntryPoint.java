package com.youtube.jwt.configuration;


import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;



@Component

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	

	@Override
	public void commence(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response,
			AuthenticationException authException) throws IOException, javax.servlet.ServletException {
		// TODO Auto-generated method stub
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Unauthorized");
		
	}
	
	
	

} 

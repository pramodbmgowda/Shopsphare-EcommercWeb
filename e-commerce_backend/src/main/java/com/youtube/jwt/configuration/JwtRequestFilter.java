package com.youtube.jwt.configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.youtube.jwt.service.JwtService;
import com.youtube.jwt.util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;

@Component

public class JwtRequestFilter extends OncePerRequestFilter {
	
	public static String CURRENT_USER = "";
	
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
final String header = request.getHeader("Authorization");

    
    String jwtToken = null;
    String userName = null;
    if(header != null && header.startsWith("Bearer ")) {
    	jwtToken = header.substring(7);
    	
    	
    	try {
    		
    		userName = jwtUtil.getUserNameFromToken(jwtToken);
    		CURRENT_USER=userName;
    		
    	}catch(IllegalArgumentException e) {
    		System.out.println("Unable to get Token");
    		
    	}catch(ExpiredJwtException e) {
    		System.out.println("jwt token has expired");
    		
    		
    	}
    	
    }else {
		System.out.println("Jwt token does not start with bearer");
	}
    
    
    if(userName !=null && SecurityContextHolder.getContext().getAuthentication() == null) {
    	
    	UserDetails  userDetails = jwtService.loadUserByUsername(userName);
    	
    	
    	if(jwtUtil.validateToken(jwtToken,userDetails)) {
    		
    		
    		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken= new UsernamePasswordAuthenticationToken(userDetails,
    				null,userDetails.getAuthorities());
    		
    		usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    		
    		SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    	}
    	
    }

filterChain.doFilter(request, response);

	}

}

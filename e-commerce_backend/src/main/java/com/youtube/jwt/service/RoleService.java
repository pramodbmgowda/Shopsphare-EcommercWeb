package com.youtube.jwt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youtube.jwt.dao.RoleDao;
import com.youtube.jwt.entity.Role;

@Service

public class RoleService {
	
	
	@Autowired
	private RoleDao roleDao;
	
 	public Role createNewRole(Role role) {
 		
 		 return  roleDao.save(role);
		
	}
}

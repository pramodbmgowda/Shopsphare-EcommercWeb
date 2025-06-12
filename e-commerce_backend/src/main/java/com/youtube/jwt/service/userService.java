package com.youtube.jwt.service;

import java.util.HashSet;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.youtube.jwt.entity.Role;
import com.youtube.jwt.entity.User;
import com.youtube.jwt.dao.RoleDao;
import com.youtube.jwt.dao.UserDao;

@Service
public class userService {
	
	@Autowired
	private UserDao userdao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public User registerNewUser(User user) {
		
		Role role = roleDao.findById("User").get();
		
		Set<Role> roles=new HashSet<>();
		roles.add(role);
		user.setRole(roles);
		
		user.setUserPassword(getEncodedPassword(user.getUserPassword()));
		
		return userdao.save(user);
	}
	
	
	public void initRolesAndUser() {
		Role adminRole = new Role();
		adminRole.setRolename("Admin");
		adminRole.setRoleDescription("Admin role");
		roleDao.save(adminRole);
		
		
		
		
		Role UserRole = new Role();
		UserRole.setRolename("User");
		UserRole.setRoleDescription("User role");
		roleDao.save(UserRole);
		
		
		User adminUser = new User();
			adminUser.setUserFirstName("admin");
			adminUser.setUserLastName("admin");
			adminUser.setUserName("admin123");
			adminUser.setUserPassword(getEncodedPassword("admin@pass"));
			Set<Role> adminRoles = new HashSet<>();
			adminRoles.add(adminRole);
			adminUser.setRole(adminRoles);
			userdao.save(adminUser);
			
			
			User user = new User();
			user.setUserFirstName("pramod");
			user.setUserLastName("bm");
			user.setUserName("pram123");
			user.setUserPassword(getEncodedPassword("pram@1689"));
			Set<Role> adminuser = new HashSet<>();
			adminuser.add(UserRole);
			user.setRole(adminuser);
			userdao.save(user);
		
		
		
	}
	
	public String getEncodedPassword(String password) {
		
		return passwordEncoder.encode(password);
		
	}
}

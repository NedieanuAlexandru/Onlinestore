package com.sda.onlinestore.controller;

import com.sda.onlinestore.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class DummyController {

    @Autowired
    private UserAccountRepository userRepository;

    @GetMapping("/api/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String userAccess() {
        return ">>> User Contents!";
    }

    @GetMapping("/api/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return ">>> Admin Contents";
    }

    @GetMapping(value = "/getUsers")
    public ResponseEntity getUsers() throws AuthenticationException {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/getAdminUsers")
    public ResponseEntity getAdminUsers() throws AuthenticationException {
        return ResponseEntity.ok(userRepository.findAll());
    }

}

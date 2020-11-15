package com.sda.onlinestore.security;

import com.sda.onlinestore.dto.UserAccountDto;
import com.sda.onlinestore.model.UserAccountModel;
import com.sda.onlinestore.repository.LoginRepository;
import com.sda.onlinestore.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service("userService")
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserAccountRepository userRepository;


    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserAccountModel> userCredentialModelOptional = userRepository.findByUsername(username);
        if (!userCredentialModelOptional.isPresent()) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        UserAccountModel userCredentialModel = userCredentialModelOptional.get();
        String userName = userCredentialModel.getUsername();
        String password = userCredentialModel.getPassword();
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();

        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_" + userCredentialModel.getRoletype().name().toUpperCase());
        authorities.add(simpleGrantedAuthority);
        return new User(userName, password, authorities);
    }

    public UserAccountModel register(UserAccountDto user) {
            UserAccountModel newUser = new UserAccountModel();
            newUser.setUsername(user.getUsername());
            newUser.setRoletype(user.getRoletype());
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            return userRepository.save(newUser);
    }
}
package com.sda.onlinestore.repository;

import com.sda.onlinestore.model.UserAccountModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<UserAccountModel,Long> {
    Optional<UserAccountModel> findByUsername(String username);
}

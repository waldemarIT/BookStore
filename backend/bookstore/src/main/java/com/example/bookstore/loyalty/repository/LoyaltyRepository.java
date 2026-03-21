package com.example.bookstore.loyalty.repository;

import com.example.bookstore.loyalty.entity.LoyaltyProgram;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoyaltyRepository extends JpaRepository<LoyaltyProgram, Long> {
    Optional<LoyaltyProgram> findByCustomerId(Long customerId);
}

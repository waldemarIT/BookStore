package com.example.bookstore.users.controller;

import com.example.bookstore.auth.dto.AuthResponse;
import com.example.bookstore.auth.entity.User;
import com.example.bookstore.loyalty.entity.LoyaltyProgram;
import com.example.bookstore.loyalty.repository.LoyaltyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final LoyaltyRepository loyaltyRepository;

    @GetMapping("/me")
    public ProfileResponse me(@AuthenticationPrincipal User user) {
        Optional<LoyaltyProgram> loyalty = loyaltyRepository.findByCustomerId(user.getId());
        return ProfileResponse.builder()
                .customer(AuthResponse.CustomerDto.builder()
                        .customerId(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .city(user.getCity())
                        .postalCode(user.getPostalCode())
                        .registrationDate(user.getRegistrationDate())
                        .role(user.getRole())
                        .build())
                .loyalty(loyalty.map(l -> LoyaltyDto.builder()
                        .currentPoints(l.getCurrentPoints())
                        .totalPoints(l.getTotalPoints())
                        .tierLevel(l.getTierLevel())
                        .build()).orElse(null))
                .build();
    }

    // ---- nested DTOs ----

    @lombok.Data @lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor
    public static class ProfileResponse {
        private AuthResponse.CustomerDto customer;
        private LoyaltyDto loyalty;
    }

    @lombok.Data @lombok.Builder @lombok.NoArgsConstructor @lombok.AllArgsConstructor
    public static class LoyaltyDto {
        private int currentPoints;
        private int totalPoints;
        private String tierLevel;
    }
}

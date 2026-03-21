package com.example.bookstore.auth.controller;

import com.example.bookstore.auth.dto.AuthResponse;
import com.example.bookstore.auth.dto.LoginRequest;
import com.example.bookstore.auth.dto.RegisterRequest;
import com.example.bookstore.auth.entity.User;
import com.example.bookstore.auth.repository.UserRepository;
import com.example.bookstore.auth.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        }

        User user = User.builder()
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .marketingConsent(Boolean.TRUE.equals(req.getMarketingConsent()))
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return toResponse(token, user);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad credentials"));
        String token = jwtService.generateToken(user);
        return toResponse(token, user);
    }

    private AuthResponse toResponse(String token, User user) {
        return AuthResponse.builder()
                .token(token)
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
                .build();
    }
}

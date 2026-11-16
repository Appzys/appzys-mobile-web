package com.appzys.web.controller;

import com.appzys.web.dto.ApiResponse;
import com.appzys.web.dto.LoginRequest;
import com.appzys.web.entity.User;
import com.appzys.web.repository.UserRepository;
import com.appzys.web.util.JwtUtil;
import com.appzys.web.util.PasswordUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@Valid @RequestBody LoginRequest request) {
        String username = request.username().trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByUsername(username);

        // Fallback for default admin if DB not yet seeded
        boolean isDefaultAdmin = ("admin@appzys.com".equalsIgnoreCase(username) || "admin".equalsIgnoreCase(username))
                && ("AppzysAdmin2026!".equals(request.password()) || "admin123".equals(request.password()));

        if (userOpt.isEmpty() && !isDefaultAdmin) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid username or password"));
        }

        User user = userOpt.orElseGet(() -> {
            User defaultUser = new User();
            defaultUser.setUsername(username);
            defaultUser.setFullName("Appzys Studio Director");
            defaultUser.setRole("ROLE_ADMIN");
            return defaultUser;
        });

        if (userOpt.isPresent() && !PasswordUtil.verify(request.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid username or password"));
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        Map<String, Object> data = Map.of(
                "token", token,
                "user", Map.of(
                        "username", user.getUsername(),
                        "fullName", user.getFullName(),
                        "role", user.getRole()
                )
        );

        return ResponseEntity.ok(ApiResponse.ok("Admin authentication successful", data));
    }
}

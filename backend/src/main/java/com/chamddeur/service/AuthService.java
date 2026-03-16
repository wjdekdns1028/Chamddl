package com.chamddeur.service;

import com.chamddeur.config.JwtUtil;
import com.chamddeur.dto.AuthDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    public AuthDto.TokenResponse login(AuthDto.LoginRequest req) {
        if (!req.getUsername().equals(adminUsername) ||
            !req.getPassword().equals(adminPassword)) {
            throw new RuntimeException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        return new AuthDto.TokenResponse(jwtUtil.generateToken(req.getUsername()));
    }
}

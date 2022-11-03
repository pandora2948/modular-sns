package com.modular.restfulserver.auth.application;

import com.modular.restfulserver.auth.dto.UserSignupRequestDto;
import com.modular.restfulserver.global.config.security.JwtProvider;
import com.modular.restfulserver.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
public class AuthService {

  private final UserRepository userRepository;
  private final JwtProvider jwtProvider;
  private final PasswordEncoder passwordEncoder;

  public AuthService(
    UserRepository userRepository,
    JwtProvider jwtProvider,
    @Lazy PasswordEncoder passwordEncoder
  ) {
    this.userRepository = userRepository;
    this.jwtProvider = jwtProvider;
    this.passwordEncoder = passwordEncoder;
  }

  public void saveUser(UserSignupRequestDto dto) {
    boolean isExistsEmail = userRepository.existsByEmail(dto.getEmail());
    boolean isExistsId = userRepository.existsById(1L);
    boolean isExistsUsername = userRepository.existsByUsername(dto.getUsername());
    log.info("isExistsId: {}", isExistsId);
    log.info("isExistsEmail: " + isExistsEmail + " isExistsUsername: " + isExistsUsername);
    if (isExistsEmail || isExistsUsername) {
      log.error("이미 존재하는 유저입니다.");
      throw new RuntimeException("이미 존재하는 유저입니다.");
    }
    Map<String, String> claims = new HashMap<>();
    claims.put("email", dto.getEmail());
    claims.put("username", dto.getUsername());
    dto.setEncodePassword(passwordEncoder.encode(dto.getPassword()));
    userRepository.save(dto.toEntity());
  }

  public Map<String, String> refresh(String refreshToken) {
    Map<String, String> accessTokenResponseMap = new HashMap<>();
    return accessTokenResponseMap;
  }

}

package com.modular.restfulserver.auth.application;

import com.modular.restfulserver.auth.dto.UserSignupRequestDto;
import com.modular.restfulserver.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class AuthService {
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  public Long saveUser(UserSignupRequestDto dto) {
    return 1L;
  }

  public Map<String, String> refresh(String refreshToken) {
    Map<String, String> accessTokenResponseMap = new HashMap<>();
    return accessTokenResponseMap;
  }

}

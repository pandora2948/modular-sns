package com.modular.restfulserver.auth.application;

import com.modular.restfulserver.auth.dto.TokenResponseDto;
import com.modular.restfulserver.auth.dto.UserLoginRequestDto;
import com.modular.restfulserver.auth.dto.UserSignupRequestDto;
import com.modular.restfulserver.auth.exception.AlreadyExistsUserException;
import com.modular.restfulserver.auth.exception.PasswordNotMatchException;
import com.modular.restfulserver.global.config.security.CustomEmailPasswordAuthToken;
import com.modular.restfulserver.global.config.security.JwtProvider;
import com.modular.restfulserver.user.model.User;
import com.modular.restfulserver.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final JwtProvider jwtProvider;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;


  public void saveUser(UserSignupRequestDto dto) {
    boolean isExistsEmail = userRepository.existsByEmail(dto.getEmail());
    boolean isExistsUsername = userRepository.existsByUsername(dto.getUsername());
    if (isExistsEmail || isExistsUsername)
      throw new AlreadyExistsUserException();

    dto.setEncodePassword(passwordEncoder.encode(dto.getPassword()));
    userRepository.save(dto.toEntity());
  }

  public Map<String, Object> loginUser(UserLoginRequestDto dto) {
    Map<String, Object> map = new HashMap<>();
    User user = userRepository.findByEmail(dto.getEmail())
      .orElseThrow(
        () -> new UsernameNotFoundException("존재하지 않는 이메일 사용자입니다.")
      );

    if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
      throw new PasswordNotMatchException();
    CustomEmailPasswordAuthToken emailPasswordAuthToken =
      new CustomEmailPasswordAuthToken(dto.getEmail(), dto.getPassword());
    Authentication authentication = authenticationManager
      .authenticate(emailPasswordAuthToken);

    String email = authentication.getName();

    String accessToken = jwtProvider.createAccessToken(email);
    String refreshToken = jwtProvider.createRefreshToken(email);

    user.updateRefreshToken(refreshToken);
    TokenResponseDto tokenDto = TokenResponseDto.builder()
      .addAccessToken(accessToken)
      .addRefreshToken(refreshToken)
      .build();
    map.put("data", tokenDto);

    return map;
  }

  public Map<String, String> refresh(String refreshToken) {
    Map<String, String> accessTokenResponseMap = new HashMap<>();
    return accessTokenResponseMap;
  }

}

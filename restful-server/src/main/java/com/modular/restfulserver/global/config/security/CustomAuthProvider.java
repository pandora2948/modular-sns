package com.modular.restfulserver.global.config.security;

import com.modular.restfulserver.user.model.User;
import com.modular.restfulserver.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Slf4j
public class CustomAuthProvider implements AuthenticationProvider {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public CustomAuthProvider(
    UserRepository userRepository,
    @Lazy PasswordEncoder passwordEncoder
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    log.info("[CustomAuthProvider] Provider 등록 완료");
  }

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String email = authentication.getName();
    String password = (String) authentication.getCredentials();

    User user = userRepository.findByEmail(email)
        .orElseThrow(
          () -> new UsernameNotFoundException("존재하지 않는 이메일 사용자입니다.")
        );

    if (!passwordEncoder.matches(password, user.getPassword()))
      throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");

    return new UsernamePasswordAuthenticationToken(
      user,
      password,
      null
    );
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return true;
  }

}

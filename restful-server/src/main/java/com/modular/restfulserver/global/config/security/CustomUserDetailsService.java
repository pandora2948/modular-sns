package com.modular.restfulserver.global.config.security;

import com.modular.restfulserver.user.model.User;
import com.modular.restfulserver.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return userRepository.findByEmail(email)
      .map(this::createUserDetails)
      .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
  }

  private UserDetails createUserDetails(User user) {
    return new org.springframework.security.core.userdetails.User(
      user.getEmail(),
      user.getPassword(),
      null
    );
  }
}

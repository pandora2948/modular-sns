package global.config.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@EnableWebSecurity
public class SpringSecurityConfiguration {

  private final CustomUserDetailsService customUserDetailsService;
  private final CustomAuthenticationFilter customAuthenticationFilter;
  private final CustomAuthorizationFilter customAuthorizationFilter;


  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web
      .ignoring()
      .antMatchers("/api/auth/**", "/auth/**");
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf().disable()
      .authorizeRequests()
      .antMatchers("/auth/**")
      .hasAnyRole()
      .anyRequest()
      .permitAll()
      .and()
      .sessionManagement(
        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .httpBasic()
      .and()
      .formLogin().disable()
      .cors().disable()
      .addFilter(customAuthenticationFilter)
      .addFilterBefore(
        customAuthorizationFilter,
        UsernamePasswordAuthenticationFilter.class
      )
      .userDetailsService(customUserDetailsService);

    log.error("설정 완료");
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    String idForEncode = "bcrypt";
    Map<String, PasswordEncoder> encoderMap = new HashMap<>();
    encoderMap.put(idForEncode, new BCryptPasswordEncoder());

    return new DelegatingPasswordEncoder(idForEncode, encoderMap);
  }

}

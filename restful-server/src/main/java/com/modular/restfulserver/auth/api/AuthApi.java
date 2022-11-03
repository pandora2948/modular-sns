package com.modular.restfulserver.auth.api;


import com.modular.restfulserver.auth.application.AuthService;
import com.modular.restfulserver.auth.dto.UserSignupRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import static com.modular.restfulserver.global.config.security.JwtConstants.TOKEN_HEADER_PREFIX;

@RequiredArgsConstructor
@RestController()
@RequestMapping("/auth")
public class AuthApi {

  private final AuthService authService;

  @GetMapping("/")
  public String test() {
    return "hello!";
  }

  @PostMapping("/signup")
  public ResponseEntity<Integer> signup(
    @RequestBody UserSignupRequestDto dto
    ) {
    authService.saveUser(dto);
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }

  @GetMapping("/refresh")
  public ResponseEntity<Map<String, String>> refresh(
    HttpServletRequest req, HttpServletResponse res
  ) {
    String authorizationHeader = req.getHeader("AUTHORIZATION");
    if (
      authorizationHeader == null
      || !authorizationHeader.startsWith(TOKEN_HEADER_PREFIX)
    )
      throw new RuntimeException("JWT Token이 존재하지 않습니다.");

    String refreshToken = authorizationHeader.substring(TOKEN_HEADER_PREFIX.length());
    Map<String, String> tokens = authService.refresh(refreshToken);

    return ResponseEntity.ok(tokens);
  }
}

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
import static global.config.security.JwtConstants.*;

@RequiredArgsConstructor
@RestController()
@RequestMapping("/auth")
public class AuthApi {

  private final AuthService authService;

  @GetMapping("/")
  public ResponseEntity getUser() {
    return new ResponseEntity("hello, world", HttpStatus.OK);
  }

  @PostMapping("/signup")
  public ResponseEntity<Long> signup(
    @RequestBody UserSignupRequestDto dto
    ) {
    return ResponseEntity.ok(authService.saveUser(dto));
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

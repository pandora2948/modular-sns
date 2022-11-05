package com.modular.restfulserver.global.config.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JwtProvider {

  private final UserDetailsService userDetailsService;
  private final Key jwtSecretKey;

  public JwtProvider(
    @Value("${jwt.secret}") String registeredSecretKey,
    UserDetailsService userDetailsService
  ) {
    this.userDetailsService = userDetailsService;
    byte[] keyBytes = Decoders.BASE64.decode(registeredSecretKey);
    this.jwtSecretKey = Keys.hmacShaKeyFor(keyBytes);
  }

  public String createAccessToken(String email) {
    Claims claims = Jwts.claims().setSubject(email);
    return createToken(claims, 60 * 60 * 100L);
  }

  public String createRefreshToken(String email) {
    Claims claims = Jwts.claims().setSubject(email);
    return createToken(claims, 7 * 24 * 60 * 60 * 1000L);
  }

  public String getUserEmailByToken(String token) {
    return parseClaims(token).getSubject();
  }

  private String createToken(Claims claims, long expTime) {
    return Jwts.builder()
      .signWith(jwtSecretKey, SignatureAlgorithm.HS256)
      .setClaims(claims)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expTime))
      .compact();
  }

  private Claims parseClaims(String accessToken) {
    try {
      return Jwts.parserBuilder()
        .setSigningKey(jwtSecretKey)
        .build()
        .parseClaimsJws(accessToken)
        .getBody();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }

}

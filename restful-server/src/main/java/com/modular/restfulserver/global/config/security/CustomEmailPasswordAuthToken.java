package com.modular.restfulserver.global.config.security;

import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;

@Getter
public class CustomEmailPasswordAuthToken extends AbstractAuthenticationToken {

  private final String principal;
  private final String credentials;

  public CustomEmailPasswordAuthToken(
    String principal,
    String credentials
  ) {
    super(null);
    this.principal = principal;
    this.credentials = credentials;
    setAuthenticated(false);
  }
}

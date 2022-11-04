package com.modular.restfulserver.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
  ALREADY_EXISTS_USER(BAD_REQUEST, "이미 존재하는 회원 정보입니다.");

  private final HttpStatus status;
  private final String details;
}

package com.modular.restfulserver.global.exception;

import com.modular.restfulserver.auth.exception.AlreadyExistsUserException;
import com.modular.restfulserver.auth.exception.InvalidTokenException;
import com.modular.restfulserver.auth.exception.NoneTokenOnHeaderException;
import com.modular.restfulserver.auth.exception.PasswordNotMatchException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static com.modular.restfulserver.global.exception.ErrorCode.*;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(AlreadyExistsUserException.class)
  protected ResponseEntity<ErrorResponse> handleAlreadyUserException() {
    return ErrorResponse.toResponseEntity(ALREADY_EXISTS_USER);
  }

  @ExceptionHandler(PasswordNotMatchException.class)
  protected ResponseEntity<ErrorResponse> handlePasswordNotMatchedException() {
    return ErrorResponse.toResponseEntity(PASSWORD_NOT_MATCH);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  protected ResponseEntity<ErrorResponse> handleUserNotFoundException() {
    return ErrorResponse.toResponseEntity(USER_NOT_FOUND);
  }

  @ExceptionHandler(NoneTokenOnHeaderException.class)
  protected ResponseEntity<ErrorResponse> handleNoneTokenOnHeaderException() {
    return ErrorResponse.toResponseEntity(NONE_TOKEN_ON_HEADER);
  }

  @ExceptionHandler(InvalidTokenException.class)
  protected ResponseEntity<ErrorResponse> handleInvalidTokenException() {
    return ErrorResponse.toResponseEntity(INVALID_TOKEN);
  }

}

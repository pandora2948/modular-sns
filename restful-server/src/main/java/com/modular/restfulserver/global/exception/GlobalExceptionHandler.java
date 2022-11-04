package com.modular.restfulserver.global.exception;

import com.modular.restfulserver.auth.exception.AlreadyExistsUserException;
import org.springframework.http.ResponseEntity;
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

}

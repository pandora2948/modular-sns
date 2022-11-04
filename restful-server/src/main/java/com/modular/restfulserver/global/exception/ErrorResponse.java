package com.modular.restfulserver.global.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Builder(setterPrefix = "add")
public class ErrorResponse {

  private final Map<String, List<String>> error;

  public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode code) {
    var responseMap = new HashMap<String, List<String>>();
    responseMap.put("message", List.of(code.getDetails()));

    return ResponseEntity
      .status(code.getStatus())
      .body(
        ErrorResponse.builder()
          .addError(responseMap)
          .build()
      );
  }

  public static ResponseEntity<ErrorResponse> toResponseEntityByArgumentNotValidException(
    MethodArgumentNotValidException ex
  ) {
    var responseMap = new HashMap<String, List<String>>();
    List<String> fieldErrorList = ex.getFieldErrors()
        .stream()
          .map(DefaultMessageSourceResolvable::getDefaultMessage)
          .collect(Collectors.toList());
    responseMap.put("message", fieldErrorList);

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(
        ErrorResponse.builder()
          .addError(responseMap)
          .build()
      );
  }

}

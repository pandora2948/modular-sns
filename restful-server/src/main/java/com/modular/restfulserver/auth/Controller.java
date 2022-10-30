package com.modular.restfulserver.auth;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/users")
public class Controller {

  @GetMapping("/")
  public ResponseEntity<String> getUser() {
    return new ResponseEntity("hello, world", HttpStatus.OK);
  }
}

package com.modular.restfulserver.entities;

import lombok.*;
import javax.persistence.*;

@Entity(name = "users")
@Getter
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(
          length = 15,
          nullable = false,
          unique = true
  )
  private String username;

  @Column(nullable = false)
  private String password;
}

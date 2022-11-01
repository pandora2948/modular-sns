package com.modular.restfulserver.user.models;

import global.utils.models.BaseTimeAuditing.CreateAndModifiedTimeAuditEntity;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.util.Assert;

import javax.persistence.*;

@Entity(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE users SET deleted_date = CURRENT_TIMESTAMP WHERE id ?")
@Where(clause = "deleted_date = null")
public class User extends CreateAndModifiedTimeAuditEntity {

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

  @Builder(
    setterPrefix = "add"
  )
  public User(
    String email,
    String username,
    String password
  ) {
    Assert.hasText(email, "email must not be null");
    Assert.hasText(username, "username must not be null");
    Assert.hasText(password, "password must not be null");

    this.email = email;
    this.username = username;
    this.password = password;
  }

  public void changePassword(String newPassword) {
    this.password = newPassword;
  }

}

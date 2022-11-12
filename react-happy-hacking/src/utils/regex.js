// 비밀번호 - 8~16자 영문 대 소문자, 숫자, 특수문자
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

// 유저명 - 4~15자 영문 대 소문자, 숫자, 밑줄
export const usernameRegex = /\w{4,15}/;

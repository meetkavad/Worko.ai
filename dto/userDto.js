//  This file contains dtos i.e. data transfer objects for request and response of user entity.

class UserRequestDto {
  constructor({ email, name, age, city, zip_code }) {
    this.email = email;
    this.name = name;
    this.age = age;
    this.city = city;
    this.zip_code = zip_code;
  }
}

class UserResponseDto {
  constructor({ _id, email, name, age, city, zip_code }) {
    this.id = _id;
    this.email = email;
    this.name = name;
    this.age = age;
    this.city = city;
    this.zip_code = zip_code;
  }
}

module.exports = { UserRequestDto, UserResponseDto };

const userDao = require("../dao/userDao");
const { UserResponseDto } = require("../dto/userDto");

// flow : controller -> service -> call appropriate userDao method -> check if user is present -> return response to controller

class UserService {
  async getUserList() {
    const users = await userDao.getUserList();
    if (!users) {
      return "No users found";
    }
    return users.map((user) => new UserResponseDto(user));
  }

  async getUserById(id) {
    const user = await userDao.getUserById(id);
    if (!user) {
      return "User not found";
    }
    return new UserResponseDto(user);
  }

  async createUser(data) {
    const new_user = await userDao.createUser(data);
    if (!new_user) {
      return "Error creating new user";
    }
    return new UserResponseDto(new_user);
  }

  async updateUser(id, data) {
    const updated_user = await userDao.updateUser(id, data);
    if (!updated_user) {
      return "No user found with this id.";
    }
    return new UserResponseDto(updated_user);
  }

  async deleteUser(id) {
    const deleted_user = await userDao.deleteUser(id);
    if (!deleted_user) {
      return "No user found with this id.";
    }
    return new UserResponseDto(deleted_user);
  }
}

module.exports = new UserService();

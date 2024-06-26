// This file is DAO (Data Access Object) Layer. It contains all our database related operations for user entity i.e. CRUD operations.

const userModel = require("../models/user");

class UserDao {
  async getUserList() {
    return await userModel.find();
  }

  async getUserById(id) {
    return await userModel.findById(id);
  }

  async createUser(data) {
    const new_user = new userModel(data);
    return await new_user.save();
  }

  async updateUser(id, new_data) {
    return await userModel.findByIdAndUpdate(id, new_data, { new: true });
  }

  async deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
  }
}

module.exports = new UserDao();

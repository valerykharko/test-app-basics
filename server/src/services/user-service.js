const UserModel = require("../database/models/user-model");
const bcrypt = require("bcrypt");

class UserService {
  async getAllUsers(limit, offset, id) {
    try {
      const users = await UserModel.find({
        _id: { $ne: id },
      })
        .limit(limit)
        .skip(offset);
      const count = await UserModel.count();

      return {
        users,
        count: count - 1,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async editInfo(name, password, photoName, id) {
    const hashPassword = password && (await bcrypt.hash(password, 3));
    const updateObject = {
      name,
      password: hashPassword,
      photo: photoName,
    };

    await UserModel.update({ _id: id }, { $set: updateObject });

    return UserModel.findById(id);
  }
}

module.exports = new UserService();

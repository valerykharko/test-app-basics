const jwt = require("jsonwebtoken");
const userService = require("../services/user-service");
const path = require("path");

class UserController {
  async getUsers(req, res, next) {
    try {
      const { page = 1, limit = 4 } = req.query;
      const offset = page * limit - limit;

      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const users = await userService.getAllUsers(limit, offset, id);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async editUser(req, res, next) {
    try {
      const { name, password } = req.body;

      let photoName;
      if (req?.files?.photo) {
        photoName =
          `profile-${Math.random().toString(36).slice(2, 10)}` + ".jpg";
        await req?.files?.photo?.mv(
          path.resolve(__dirname, "../", "database/static/images", photoName)
        );
      }

      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await userService.editInfo(name, password, photoName, id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();

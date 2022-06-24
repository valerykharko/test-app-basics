import $api from "./index";

export default class UserService {
  static async registration(formData) {
    return $api.post("/auth/registration", formData);
  }

  static async login(email, password) {
    return $api.post("/auth/login", { email, password });
  }

  static async logout() {
    return $api.post("/auth/logout");
  }

  static async getUsers(page, limit) {
    return $api.get("/users", { params: { page, limit } });
  }

  static async editInfo(formData) {
    return $api.patch("/users", formData);
  }
}

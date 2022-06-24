module.exports = class UserDto {
  id;
  name;
  email;
  date_of_birth;
  gender;
  photo;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.date_of_birth = model.date_of_birth;
    this.gender = model.gender;
    this.photo = model.photo;
  }
};

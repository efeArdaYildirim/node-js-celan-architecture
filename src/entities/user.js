module.exports.User = class User {
  constructor ({
    id,
    name = null,
    lastName = null,
    gender = genders.NOT_SPECIFIED,
    meta
  }) {
    this.id = id
    this.name = name
    this.gender = gender
    this.lastName = lastName
    this.meta = meta
  }

  clone() {
    return new User({
      id: this.id,
      name: this.name,
      gender: this.gender,
      lastName: this.lastName,
      meta: this.meta
    })
  }
}

const genders = {
  NOT_SPECIFIED: 0,
  FAMLE: 1,
  MALE: 2
}

module.exports.userConstants = {
  genders
}
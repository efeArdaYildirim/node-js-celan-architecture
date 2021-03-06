const { User } = require('../../entities')

module.exports = dependecies => {
  const { userRepository } = dependecies;
  if (!userRepository) {
    throw new Error('bu user dependenciesde yok')
  }

  const execute = ({
    name,
    lastName,
    gender,
    meta
  }) => {
    const user = new User({ name, lastName, gender, meta })
    return userRepository.add(user)
  }

  return { execute }
}
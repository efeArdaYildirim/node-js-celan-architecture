const { User } = require('../../entities')

module.exports = dependecies => {
  const { userRepository } = dependecies;
  if (!userRepository) {
    throw new Error('bu user dependenciesde yok')
  }

  const execute = ({ id }) => {
    return userRepository.getById(id)
  }

  return { execute }
}
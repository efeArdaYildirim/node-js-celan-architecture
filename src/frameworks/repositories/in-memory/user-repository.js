const { inMemory: inMemoryDb } = require("../../database");
const { v4: uuid } = require('uuid')
module.exports = {
  add: (user) => {
    if (!user.id) {
      user.id = uuid()
    }
    inMemoryDb.users.set(user.id, user)
    return user
  },
  update: (user) => {
    if (!inMemoryDb.users.has(user.id)) return null
    inMemoryDb.users.set(user.id, user)
    return inMemoryDb.users.get(user.id)
  },
  delete: (user) => {
    if (!inMemoryDb.users.has(user.id)) return null
    inMemoryDb.users.delete(user.id)
    return user
  },
  getById: (id) => {
    if (!inMemoryDb.users.has(id)) return undefined
    return inMemoryDb.users.get(id)
  }
}
const { inMemory: inMemoryDb } = require("../../database");
const { v4: uuid } = require('uuid')
module.exports = {
  add: (product) => {
    if (!product.id) {
      product.id = uuid()
    }
    inMemoryDb.products.set(product.id, product)
    return product
  },
  update: (product) => {
    if (!inMemoryDb.products.has(product.id)) return null
    inMemoryDb.products.set(product.id, product)
    return inMemoryDb.products.get(product.id)
  },
  delete: (product) => {
    if (!inMemoryDb.products.has(product.id)) return null
    inMemoryDb.products.delete(product.id)
    return product
  },
  getById: (id) => {
    if (!inMemoryDb.products.has(id)) return undefined
    return inMemoryDb.products.get(id)
  }
}
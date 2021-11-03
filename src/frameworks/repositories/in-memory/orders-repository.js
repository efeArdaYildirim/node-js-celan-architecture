const { inMemory: inMemoryDb } = require("../../database");
const { v4: uuid } = require('uuid')
module.exports = {
    add: (order) => {
        if (!order.id) {
            order.id = uuid()
        }
        inMemoryDb.orders.set(order.id, order)
        return order
    },
    update: (order) => {
        if (!inMemoryDb.orders.has(order.id)) return null
        inMemoryDb.orders.set(order.id, order)
        return inMemoryDb.orders.get(order.id)
    },
    delete: (order) => {
        if (!inMemoryDb.orders.has(order.id)) return null
        inMemoryDb.orders.delete(order.id)
        return order
    },
    getById: (id) => {
        if (!inMemoryDb.orders.has(id)) return undefined
        return inMemoryDb.orders.get(id)
    }
}
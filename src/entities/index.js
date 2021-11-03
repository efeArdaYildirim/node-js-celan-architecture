const { User, userConstants } = require("./user");
const { Product } = require('./product')
const { Order } = require('./order')
module.exports = {
  User,
  Product,
  Order,
  constants: {
    userConstants
  }
}
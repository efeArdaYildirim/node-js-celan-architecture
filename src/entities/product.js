module.exports.Product = class Product {
  constructor ({
    id,
    name = null,
    description = null,
    images = [],
    price = null,
    color = null,
    meta = {}
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.images = images
    this.price = price
    this.color = color
    this.meta = meta
  }

  clone() {
    return new Product({
      id: this.id,
      name: this.name,
      description: this.description,
      images: this.images,
      price: this.price,
      color: this.color,
      meta: this.meta
    })
  }
}
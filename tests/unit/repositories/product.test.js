const { productRepository } = require('../../../src/frameworks/repositories/in-memory')
const { Product } = require('../../../src/entities/index')
const Chance = require('chance');
const { add } = require('../../../src/frameworks/repositories/in-memory/user-repository');

const chance = new Chance()
const cerateRandomProduct = () => {
  return new Product({
    name: chance.name(),
    description: chance.sentence(),
    images: [chance.url(), chance.url(), chance.url()],
    price: chance.natural(),
    color: chance.color(),
    meta: {
      deliverFrom: chance.country()
    }
  })
}
describe('Product repository', () => {
  test('yeni product olusturulup donmeli', async () => {

    const testProduct = cerateRandomProduct()
    const addedProduct = await productRepository.add(testProduct)
    expect(addedProduct).toBeDefined()
    expect(addedProduct.id).toBeDefined()
    expect(addedProduct.description).toBe(testProduct.description)
    expect(addedProduct.name).toBe(testProduct.name)
    expect(addedProduct.images).toEqual(testProduct.images)
    expect(addedProduct.price).toBe(testProduct.price)
    expect(addedProduct.color).toBe(testProduct.color)
    expect(addedProduct.meta).toEqual(testProduct.meta)


    const returnedProduct = await productRepository.getById(addedProduct.id)
    expect(returnedProduct).toEqual(addedProduct)
  })
  test('yeni product silinmeli', async () => {

    const willBeDeletedProduct = cerateRandomProduct()
    const shouldStayProduct = cerateRandomProduct()

    const [willBeDeletedAddedProduct, shouldStayAddedProduct] = await Promise.all([
      productRepository.add(willBeDeletedProduct),
      productRepository.add(shouldStayProduct)
    ])

    expect(willBeDeletedAddedProduct).toBeDefined()
    expect(shouldStayAddedProduct).toBeDefined()

    const deletedProduct = await productRepository.delete(willBeDeletedAddedProduct)
    expect(deletedProduct).toEqual(deletedProduct)

    const shouldBeUndefiendProduct = await productRepository.getById(deletedProduct.id)
    expect(shouldBeUndefiendProduct).toBeUndefined()

    const shouldBeDefiendProduct = await productRepository.getById(shouldStayAddedProduct.id)
    expect(shouldBeDefiendProduct).toBeDefined()

  })
  test('yeni product guncellenmeli', async () => {
    const testProduct = cerateRandomProduct()

    const addedProduct = await productRepository.add(testProduct)
    expect(addedProduct).toBeDefined()

    const cloneProduct = testProduct.clone()
    cloneProduct.name = chance.name()
    cloneProduct.price = chance.natural()

    const updatedProdut = await productRepository.update(cloneProduct)
    expect(updatedProdut).toEqual(cloneProduct)

  })
});
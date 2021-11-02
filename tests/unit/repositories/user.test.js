const Chance = require('chance');
var chance = new Chance();

const { userRepository } = require('../../../src/frameworks/repositories/in-memory/index')

const {
  User,
  constants: {
    userConstants: {
      genders
    }
  } } = require('../../../src/entities')

describe("User repository", () => {

  test('New user should be added and returned', async () => {
    const testUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FAMLE,
      meta: { harir: { color: 'red' } }
    })

    const addedUser = await userRepository.add(testUser)
    expect(addedUser).toBeDefined()
    expect(addedUser.id).toBeDefined()
    expect(addedUser.name).toBe(testUser.name)
    expect(addedUser.lastName).toBe(testUser.lastName)
    expect(addedUser.gender).toBe(testUser.gender)
    expect(addedUser.meta).toBe(testUser.meta)

    const returnedUser = await userRepository.getById(addedUser.id)
    expect(returnedUser).toEqual(addedUser)
  })
  test('New user should be deleted', async () => {
    // iki user olustur 
    const willBeDelteedUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FAMLE,
      meta: { harir: { color: 'red' } }
    })
    const shouldStayUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FAMLE,
      meta: { harir: { color: 'yellow' } }
    })

    // iki useri ekle

    const [willBeDelteedAddedUser, shouldStayAddedUser] = await Promise.all([userRepository.add(willBeDelteedUser), userRepository.add(shouldStayUser)])
    expect(willBeDelteedAddedUser).toBeDefined()
    expect(shouldStayAddedUser).toBeDefined()
    // birini sil
    const deletedUser = await userRepository.delete(willBeDelteedUser)
    expect(deletedUser).toEqual(willBeDelteedUser)
    // silinmis olan useri al ( null olmali )
    const shouldBeUndefinedUser = await userRepository.getById(deletedUser.id)
    expect(shouldBeUndefinedUser).toBeUndefined()
    // silinmemis olmasi gerekn useri al 
    const shouldBeDefinedUser = await userRepository.getById(shouldStayAddedUser.id)
    expect(shouldBeDefinedUser).toBeDefined()
  })
  test('New user should be updateed', async () => {
    // bir kulanici ekle
    const testUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FAMLE,
      meta: { harir: { color: 'red' } }
    })
    const addedUser = await userRepository.add(testUser)
    expect(addedUser).toBeDefined();

    // kullaniciyi guncelle
    const cloneUser = testUser.clone()
    cloneUser.gender = genders.MALE
    cloneUser.name = chance.name()

    const updatedUser = await userRepository.update(cloneUser)
    expect(updatedUser).toEqual(cloneUser)
  })
})
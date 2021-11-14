const { user: { addUserUseCase, getUserUseCase, updateUserUseCase, deleteUserUseCase } } = require('../../../src/use-cases')
const { User, constants: {
  userConstants: {
    genders
  }
} } = require('../../../src/entities')

const { v4: uuid } = require('uuid')
const Chance = require('chance');
var chance = new Chance();

const createRandomUser = () => {
  return new User({
    name: chance.name(),
    gender: genders.FAMLE,
    lastName: chance.last(),
    meta: {
      hair: { color: 'red' }
    }
  })
}

describe('User use cases', () => {
  const mockUserRepo = {
    add: jest.fn(async user => ({
      ...user,
      id: uuid()
    })),
    getById: jest.fn(async id => ({
      id,
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FAMLE,
      meta: {}
    })),
    update: jest.fn(async user => user),
    delete: jest.fn(async user => user)
  }
  const dependencies = {
    userRepository: mockUserRepo
  }
  describe('add user use case', () => {
    test('user should be added', async () => {

      // create a user data 
      const testUser = createRandomUser()
      // add user using the use case 
      const addedUser = await addUserUseCase(dependencies).execute(testUser)

      // check the recived data
      expect(addedUser).toBeDefined()
      expect(addedUser.id).toBeDefined()
      expect(addedUser.name).toBe(testUser.name)
      expect(addedUser.gender).toBe(testUser.gender)
      expect(addedUser.lastName).toBe(testUser.lastName)
      expect(addedUser.meta).toEqual(testUser.meta)
      // check that data the dependencies called as exceppted 
      const call = mockUserRepo.add.mock.calls[0][0]
      expect(call.id).toBeUndefined()
      expect(call.name).toBe(testUser.name)
      expect(call.gender).toBe(testUser.gender)
      expect(call.lastName).toBe(testUser.lastName)
      expect(call.meta).toEqual(testUser.meta)
    })
  })

  describe('get user use case', () => {
    test('user shold be retuned by id', async () => {
      // genereate fake id
      const fakeId = uuid()
      // call get user by id 
      const userById = await getUserUseCase(dependencies).execute({ id: fakeId })
      // check the data
      expect(userById).toBeDefined()
      expect(userById.name).toBeDefined()
      expect(userById.lastName).toBeDefined()
      expect(userById.gender).toBeDefined()
      expect(userById.meta).toBeDefined()
      expect(userById.id).toBeDefined()
      // check the mock

      const expextedId = mockUserRepo.getById.mock.calls[0][0]
      expect(expextedId).toBe(fakeId)

    })

  })
  describe('update user use case', () => {
    test('User should be updated', async () => {
      // create a user data
      const testData = {
        id: uuid(),
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.FEMALE,
        meta: {
          education: {
            school: 'full'
          }
        }
      }

      // call update a user
      const updatedUser = await updateUserUseCase(dependencies).execute({
        user: testData
      })

      // check the result
      expect(updatedUser).toEqual(testData);

      // check the call
      const expectedUser = mockUserRepo.update.mock.calls[0][0];
      expect(expectedUser).toEqual(testData);
    })
  })

  // describe delete user use case with jest.fn()
  describe('delete user use case', () => {
    test('user should be deleted', async () => {
      // create a user data
      const testData = createRandomUser()

      // call delete a user
      const deletedUser = await deleteUserUseCase(dependencies).execute({
        user: testData
      })

      // check the result
      expect(deletedUser).toEqual(testData);

      // check the call
      const expectedUser = mockUserRepo.delete.mock.calls[0][0];
      expect(expectedUser).toEqual(testData);
    })
  })
})
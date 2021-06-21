var should = require('chai').should()

const UsersService = require('../services/users')

describe('users', () => {
  describe('checkIfUserExists', () => {
    it('should return false for unique emails', async () => {
      const resp = await UsersService.checkIfUserExists('soorej@lp.co')
      resp.should.equal(false)
    })
  })
  // describe('createUser', () => {
  //   it('should create a new user', async () => {
  //     try {
  //       const resp = await UsersService.createUser('username', 'displayName', 'email', 'userID');
  //       resp.should.be.a('json');
  //     } catch (error) {
  //       error.should.not.equal('')
  //     }
  //   })
  // })
})


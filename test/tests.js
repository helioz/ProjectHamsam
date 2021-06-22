var should = require('chai').should()
var expect = require('chai').expect


const UsersService = require('../services/users')

describe('users', () => {
  describe('checkIfUserExists', () => {
    it('should return false for unique emails', async () => {
      const resp = await UsersService.checkIfUserExists('soorej@lp.co')
      resp.should.equal(false)
    })
  })
  describe('createUser', () => {
    it('should create a new user', async () => {
      let resp = await UsersService.createUser('username', 'displayName', 'email');
      resp.should.have.all.keys('username', 'displayName', 'email', '_id', 'userID');
    });
  });
  return
});


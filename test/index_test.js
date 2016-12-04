var assert = require('assert')
var tumblethough = require('../src/index.js')

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      tumblethough.init()
      assert.equal(-1, [1, 2, 3].indexOf(4))
    })
  })
})

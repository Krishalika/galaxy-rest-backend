const {Waiter} = require('../../models/waiter.model');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('waiter.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = { 
      _id: new mongoose.Types.ObjectId().toHexString()
    };
    const user = new Waiter(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});
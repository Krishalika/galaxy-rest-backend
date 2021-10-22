const request = require('supertest');
const {Room} = require('../../models/booking.model');
const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');
server.close()

describe('/room', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await Room.deleteMany({});
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })
  describe('GET /', () => {
    it('should return all room items', async () => {
      const room = [
        { 
            roomNo:1,
            satus:'Available',
            bedCount:2
        }
      ];
      await Room.collection.insertMany(room);
      const res = await request(server).get('/rooms');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });
  
});
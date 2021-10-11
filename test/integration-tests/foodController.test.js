const request = require('supertest');
const {Food} = require('../../models/food.model');
const mongoose = require('mongoose');

let {server}=require('../../index');
let {connection}=require('../../index');

describe('/food', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await Food.remove({});
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })
  describe('GET /', () => {
    it('should return all food items', async () => {
      const food = [
        { name: 'genre1' },
        { name: 'genre2' },
      ];
      
      await Food.collection.insertMany(food);

      const res = await request(server).get('/food');
      
      expect(res.status).toBe(200);
    //   expect(res.body.length).toBe(2);
    //   expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
    //   expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  
});
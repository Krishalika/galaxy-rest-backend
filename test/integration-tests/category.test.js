const request = require('supertest');
const Category = require('../../models/category.model');
const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');
server.close()

describe('/category', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await Category.deleteMany({});
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })
  describe('GET /', () => {
    it('should return all category items', async () => {
      const category = [
        { 
            name:'Pizza',
            img:'pizz.com'
        }
      ];
      await Category.collection.insertMany(category);
      const res = await request(server).get('/category');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });
  
});
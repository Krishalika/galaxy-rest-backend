const request = require('supertest');
const {Food} = require('../../models/food.model');
const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');
server.close()

describe('/food', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await Food.deleteMany({});
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })
  describe('GET /', () => {
    it('should return all food items', async () => {
      const food = [
        { name: "MilkShake",description: "Cool",price: 150.65,code:"D100",category:"Drinks",status:"Available",img:"https://www.google.com",
        discount: 0},
        { name: "Cake",description: "Yummy",price: 150.65,code:"O100",category:"Others",status:"Available",img:"https://www.google.com",
        discount: 0},
      ];
      await Food.collection.insertMany(food);
      const res = await request(server).get('/food');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'MilkShake')).toBeTruthy();
      expect(res.body.some(g => g.description === 'Cool')).toBeTruthy();
      expect(res.body.some(g => g.price === 150.65)).toBeTruthy();
      expect(res.body.some(g => g.code === 'D100')).toBeTruthy();
      expect(res.body.some(g => g.category === 'Drinks')).toBeTruthy();
      expect(res.body.some(g => g.status === 'Available')).toBeTruthy();
      expect(res.body.some(g => g.img === 'https://www.google.com')).toBeTruthy();
      expect(res.body.some(g => g.discount === 0)).toBeTruthy();
    });
  });

  
});
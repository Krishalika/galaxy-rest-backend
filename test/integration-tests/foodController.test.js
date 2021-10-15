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

  describe('POST /', () => {
    let name;let description;let price;let code; let category; let status; let img; let discount

    const exec = async () => {
      return await request(server)
        .post('/food/add')
        .send({ name,description,price,code,category,status,img,discount});
    }

    beforeEach(() => {   
      name= "MilkShake";description= "Cool";price= 150.65;code="D100";category="Drinks",status="Available";img="https://www.google.com";
        discount= 0
    })

    it('should return 400 if food is less than 3 characters', async () => {
      name = 'fo'; description= "Cool";price= 150.65;code="D100";category="Drinks",status="Available";img="https://www.google.com";
      discount= 0
      
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if food is more than 50 characters', async () => {
      name = new Array(52).join('a');description= "Cool";price= 150.65;code="D100";category="Drinks",status="Available";img="https://www.google.com";
      discount= 0

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the food if it is valid', async () => {
      await exec();

      const food = await Food.find({ name: 'MilkShake' });

      expect(food).not.toBeNull();
    });

    it('should return the food if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'MilkShake');
      expect(res.body).toHaveProperty('description', 'Cool');
      expect(res.body).toHaveProperty('price', 150.65);
      expect(res.body).toHaveProperty('code', 'D100');
      expect(res.body).toHaveProperty('category', 'Drinks');
      expect(res.body).toHaveProperty('status', 'Available');
      expect(res.body).toHaveProperty('img', 'https://www.google.com');
      expect(res.body).toHaveProperty('discount',0);
    });
  });
  describe('UPDATE /:id', () => {
    let newName; 
    let food; 
    let id; 

    const exec = async () => {
      return await request(server)
        .post('/food/update/' + id)
        .send({ name:newName,description,price,code,category,status,img,discount});
        
    }

    beforeEach(async () => {
      // Before each test we need to create a food and 
      // put it in the database.      
      food = new Food({ name: "MilkShake",
      description: "Cool",
      price: 150.65,
      code:"D100",
      category:"Drinks",
      status:"Available",
      img:"https://www.google.com",
      discount: 0 });
      await food.save();
     
      id = food._id; 
      newName = 'updatedName'; 
    })


    it('should return 400 if food is less than 3 characters', async () => {
      newName = 'fo'; description= "Cool";price= 150.65;code="D100";category="Drinks",status="Available";img="https://www.google.com";
      discount= 0
      
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if food is more than 50 characters', async () => {
      newName = new Array(52).join('a');description= "Cool";price= 150.65;code="D100";category="Drinks",status="Available";img="https://www.google.com";
      discount= 0

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if food with the given id was not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should update the food if input is valid', async () => {
      await exec();

      const updatedfood = await Food.findById(food._id);

      expect(updatedfood.name).toBe(newName);
    });

    it('should return the updated food if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName);
    });
  });  

  describe('DELETE /:id', () => { 
    let food; 
    let id; 

    const exec = async () => {
      return await request(server)
        .delete('/food/' + id)
        .send();
    }

    beforeEach(async () => {
      // Before each test we need to create a food and 
      // put it in the database.      
      food = new Food({ name: "MilkShake",
      description: "Cool",
      price: 150.65,
      code:"D100",
      category:"Drinks",
      status:"Available",
      img:"https://www.google.com",
      discount: 0});

      await food.save(); 
      id = food._id;    
    })

    it('should return 404 if id is invalid', async () => {
      id = 1; 
      
      const res = await exec();

      expect(res.status).toBe(404);
    });
    it('should return 404 if no food with the given id was found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });
    
    it('should delete the food if input is valid', async () => {
      await exec();

      const foodInDb = await Food.findById(id);

      expect(foodInDb).toBeNull();
    });
    
    it('should return the removed food', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', food._id.toHexString());
      expect(res.body).toHaveProperty('name', food.name);
    });
  });  
  
});
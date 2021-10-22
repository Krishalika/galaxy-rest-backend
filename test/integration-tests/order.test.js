const request = require('supertest');
const {Order} = require('../../models/order.model');
const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');
server.close()

describe('/order', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await Order.deleteMany({});
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })
  describe('GET /', () => {
    it('should return all order items', async () => {
      const order = [
        { customerName: "Kasun",
        idNumber: "973221337v",
        tableNumber: 5,
        foodItems: [
          { item: "613864d3f106b435b0a54864", soldPrice: 250.0, qty: 4 },
          { item: "6138657df106b435b0a54868", soldPrice: 257.35, qty: 4 },
        ],}
      ];
      await Order.collection.insertMany(order);
      const res = await request(server).get('/order');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1)
    });
  });

  describe('POST /', () => {
    let name;let description;let price;let code; let category; let status; let img; let discount

    const exec = async () => {
      return await request(server)
        .post('/order')
        .send({ customerName,idNumber,tableNumber,foodItems});
    }

    beforeEach(() => {   
        customerName= "Kasun",
        idNumber="973221337v",
        tableNumber= 5,
        foodItems= [
          { item: "613864d3f106b435b0a54864", soldPrice: 250.0, qty: 4 },
          { item: "6138657df106b435b0a54868", soldPrice: 257.35, qty: 4 },
        ]
    })

    it('should return 401 if name is not provided', async () => {
        customerName= "",
        idNumber="973221337v",
        tableNumber= 5,
        foodItems= [
          { item: "613864d3f106b435b0a54864", soldPrice: 250.0, qty: 4 },
          { item: "6138657df106b435b0a54868", soldPrice: 257.35, qty: 4 },
        ]
      
      const res = await exec();

      expect(res.status).toBe(401);
    });


    it('should save the order if it is valid', async () => {
      await exec();

      const order = await Order.find({ customerName: 'Kasun' });

      expect(order).not.toBeNull();
      
    });

    it('should return the order if it is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("message",'Order Placed Succesfully');
   
    });
  });

  describe('GET /:id', () => {
    it('should return a order item if valid id is passed', async () => {
      order = new Order({
        customerName: "Kasun",
        idNumber:"973221337v",
        tableNumber:5,
        foodItems: [
          { item: "613864d3f106b435b0a54864", soldPrice: 250.0, qty: 4 },
          { item: "6138657df106b435b0a54868", soldPrice: 257.35, qty: 4 },
        ]
       });
      await order.save();

      const res = await request(server).get('/order/'+ order._id);

      expect(res.status).toBe(200); 
    });

  });
  describe('DELETE /:id', () => { 
    let order; 
    let id; 

    const exec = async () => {
      return await request(server)
        .post('/order/delete/' + id)
        .send();
    }

    beforeEach(async () => {
        order = new Order({
            customerName:"Kasun",
            idNumber:"973221337v",
            tableNumber: 5,
            foodItems: [
              { item: "613864d3f106b435b0a54864", soldPrice: 250.0, qty: 4 },
              { item: "6138657df106b435b0a54868", soldPrice: 257.35, qty: 4 },
            ]
           });

      await order.save(); 
      id = order._id;    
    })
    
    it('should delete the order if input is valid', async () => {
        const res =await exec();
      expect(res.status).toBe(200);
    //   const orderInDb = await Order.findById(id);

    //   expect(orderInDb).toBeNull();
    });
    
    // it('should return the removed order', async () => {
    //   const res = await exec();

    //   expect(res.body).toHaveProperty('_id', order._id.toHexString());
    // });
  });  
  
});
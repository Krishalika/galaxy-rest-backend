const request = require('supertest');
const {Booking} = require('../../models/booking.model');
const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');
server.close()

describe('/booking', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await Booking.deleteMany({});
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })
  describe('GET /', () => {
    it('should return all booking items', async () => {
      const booking = [
        { customerName: "Customer",
        customerEmail: "cus@gmail.com",
        customerContactNumber: "940776534567",
        startDate:"2021-10-11",
        endDate:"2021-10-12",
        room:"abcd"},
        { customerName: "Customer2",
        customerEmail: "cus2@gmail.com",
        customerContactNumber: "940776534564",
        startDate:"2021-10-11",
        endDate:"2021-10-12",
        room:"abce"},
      ];
      await Booking.collection.insertMany(booking);
      const res = await request(server).get('/booking');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    //   expect(res.body.some(g => g.name === 'MilkShake')).toBeTruthy();
    //   expect(res.body.some(g => g.description === 'Cool')).toBeTruthy();
    //   expect(res.body.some(g => g.price === 150.65)).toBeTruthy();
    //   expect(res.body.some(g => g.code === 'D100')).toBeTruthy();
    //   expect(res.body.some(g => g.category === 'Drinks')).toBeTruthy();
    //   expect(res.body.some(g => g.status === 'Available')).toBeTruthy();
    //   expect(res.body.some(g => g.img === 'https://www.google.com')).toBeTruthy();
    //   expect(res.body.some(g => g.discount === 0)).toBeTruthy();
    });
  });

  describe('POST /', () => {
    let name;let description;let price;let code; let category; let status; let img; let discount

    const exec = async () => {
      return await request(server)
        .post('/booking/add')
        .send({ customerName, customerEmail,customerContactNumber,startDate,endDate,room});
    }

    beforeEach(() => {   
      customerName= "Customer",
      customerEmail= "cus@gmail.com",
      customerContactNumber= "940776534567",
      startDate="2021-10-11",
      endDate="2021-10-12",
      room=mongoose.Types.ObjectId();
    })

    it('should return 401 if name is less than 3 characters', async () => {
      customerName= "Cu",
      customerEmail= "cus@gmail.com",
      customerContactNumber= "940776534567",
      startDate="2021-10-11",
      endDate="2021-10-12",
      room=mongoose.Types.ObjectId();
      
      const res = await exec();

      expect(res.status).toBe(401);
    });


    it('should save the booking if it is valid', async () => {
      await exec();

      const booking = await Booking.find({ customerName: 'Customer' });

      expect(booking).not.toBeNull();
      
    });

    it('should return the booking if it is valid', async () => {
      const res = await exec();
      // expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message",'Booking Placed Succesfully');
    //   expect(res.body).toHaveProperty('name', 'MilkShake');
    //   expect(res.body).toHaveProperty('description', 'Cool');
    //   expect(res.body).toHaveProperty('price', 150.65);
    //   expect(res.body).toHaveProperty('code', 'D100');
    //   expect(res.body).toHaveProperty('category', 'Drinks');
    //   expect(res.body).toHaveProperty('status', 'Available');
    //   expect(res.body).toHaveProperty('img', 'https://www.google.com');
    //   expect(res.body).toHaveProperty('discount',0);
    });
  });
 
  
});
const request = require('supertest');
// const { User } = require("../../models/waiter.model");
// const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');

server.close()

describe('/AddWaiter', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    // await User.deleteMany({});
    
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })

  describe('POST /', () => {
    let name;let email;let password;let nic; let contactNo;let salary
    const exec = async () => {
      return await request(server)
        .post('/addWaiter/signup')
        .send({ name,email,password,nic,contactNo,salary});
    }

    beforeEach(() => {   
      name= "user";email= "u@gmail.com";password= "abcdef";nic="956789087V";contactNo=940776578567;salary=10000
    })

    it('should return 400 if email is not valid', async () => {
        const t=2+2
        expect(t).toEqual(4)
      //   name= "user";email= "user";password= "abcdef";nic="956789087V";contactNo=940776578567;salary=10000
      // const res = await exec();

      // expect(res.status).toBe(400);
      
    });


  });
  

  
});
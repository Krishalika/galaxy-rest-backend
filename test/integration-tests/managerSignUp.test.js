const request = require('supertest');
const { User } = require("../../models/user.model");
const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');

server.close()

describe('/ManagerSignUp', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await User.deleteMany({});
    
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })

  describe('POST /', () => {
    let name;let email;let password;let nic; let contactNo
    const exec = async () => {
      return await request(server)
        .post('/signup')
        .send({ name,email,password,nic,contactNo});
    }

    beforeEach(() => {   
      name= "user";email= "u@gmail.com";password= "abcdef";nic="956789087V";contactNo=940776578567
    })

    it('should return 400 if email is not valid', async () => {

        name= "user";email= "user";password= "abcdef";nic="956789087V";contactNo=940776578567
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it('should return 400 if nic is not valid', async () => {
 
      name= "user";email= "user";password= "abcdef";nic="9567890876V";contactNo=940776578567
    const res = await exec();

    expect(res.status).toBe(400);
  });

    // it('should save the User if it is valid', async (done) => {
     
    //   await exec();
      
    //   const user = await User.find({ email:'u@gmail.com' });
    
    //   expect(user).not.toBeNull();
    //   done()
    // },500000);

    // it('should return the User if it is valid', async () => {
    //   await longProcess();
    //   const res = await exec();

    //   expect(res.body).toHaveProperty('_id');
    //   expect(res.body).toHaveProperty('name', 'user');
    //   expect(res.body).toHaveProperty('email', 'u@gmail.com');
    //   expect(res.body).toHaveProperty('nic', "956789087V");
    // });
  });
  

  
});
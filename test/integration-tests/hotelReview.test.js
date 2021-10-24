const request = require('supertest');
const Review = require('../../models/review.model');
const mongoose = require('mongoose');
let {server}=require('../../index');
let {connection}=require('../../index');
const {User} = require('../../models/user.model');
server.close()

describe('/review', () => {
  beforeEach(() => server)
  afterEach(async () => { 
    server.close(); 
    await Review.deleteMany({});
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    connection.close()
    done()
  })
  describe('GET /', () => {
    it('should return all reviews', async () => {
      const review = [
        { name: "Rathnayake",rating:5,review:"Nice hotel",reply:"Thanks"},
        { name: "Customer",rating: 4,review:"Great",reply:"Thank you"},
      ];
      await Review.collection.insertMany(review);
      const res = await request(server).get('/review');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'Rathnayake')).toBeTruthy();
      expect(res.body.some(g => g.rating === 5)).toBeTruthy();
      expect(res.body.some(g => g.review === "Nice hotel")).toBeTruthy();
      expect(res.body.some(g => g.reply === "Thanks")).toBeTruthy();
     
    });
  });
      
  describe('POST /', () => {
    let name;let rating;let review

    const exec = async () => {
      return await request(server)
        .post('/review')
        .send({ name,rating,review});
    }

    beforeEach(() => {   
        name= "Newton",
        rating= 3,
        review="Nice hotel"
    })
    it('should return 401 if review is less than 5 characters', async () => {
        name= "Newton",
        rating= 3,
        review= "Nice"
      
      const res = await exec();

      expect(res.status).toBe(401);
    });
  

    it('should save the review if it is valid', async () => {
      await exec();

      const review = await Review.find({ name: 'Newton' });

      expect(review).not.toBeNull();
    });
     it('should return the updated review if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("message",'Review added successfully');
      
    });

  });
  
  describe('UPDATE /:id', () => {
    let newReply; 
    let review; 
    let id; 
    let token; 

    const exec = async () => {
      return await request(server)
        .post('/review/update/' + id)
        .set('Authorization', `Bearer ${token}`)
        .send({ reply:newReply,name,rating,review});
        
    }

    beforeEach(async () => {
      // Before each test we need to create a review and 
      // put it in the database.  
      token = new User().generateAuthToken();      
      review = new Review({ name: "Newton",
      rating: 3,
      review: "Nice hotel",
      });
      await review.save();
     
      id = review._id; 
      newReply = 'updatedreply'; 
    })


    it('should return 400 if review is less than 5 characters', async () => {
        name= "Newton",
        rating= 3,
        review= "Nice",
        reply="Thank you"
      
      const res = await exec();

      expect(res.status).toBe(400);
    });


    // it('should update the review if input is valid', async () => {
    //   await exec();

    //   const updatedreview = await Review.findById(review._id);

    //   expect(updatedreview.reply).toBe(newReply);
    // });

    // it('should return the updated review if it is valid', async () => {
    //   const res = await exec();

    //   expect(res.body).toHaveProperty('_id');
    //   expect(res.body).toHaveProperty('reply', newReply);
    // });
  });  

 
  
});
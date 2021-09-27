const {validate} =require('../../validation/userValidation');
let item;
describe('manager object validation process',()=>{

    beforeEach(()=>{

        item ={
            name: "user",
    email: "vy@gmail.com",
    password: "passwprd",
    nic:"997609678V",
    contactNo: 940778956788
       }

    });
    it('name cannot be empty',()=>{
        item.name=""
        const result = validate(item)
        expect(result.error.message).toEqual( "\"name\" is not allowed to be empty");

    });
    it('email cannot be empty',()=>{
        item.email=""
        const result = validate(item)
        expect(result.error.message).toEqual( "\"email\" is not allowed to be empty");

    });
    it('password cannot be empty',()=>{
        item.password=""
        const result = validate(item)
        expect(result.error.message).toEqual("\"password\" is not allowed to be empty");

    });
    it('password must have min 5 characters',()=>{
        item.password="abc"
        const result = validate(item)
        expect(result.error.message).toEqual("\"password\" length must be at least 5 characters long");

    });
    
    it('email must be an email',()=>{
        item.email="aabbcc"
        const result = validate(item)
        expect(result.error.message).toEqual("\"email\" must be a valid email");

    });
    it('contactNo cannot be a string',()=>{
        item.contactNo=""
        const result = validate(item)
        expect(result.error.message).toEqual("\"contactNo\" must be a number");

    });
    it('contact number must be postive',()=>{
        item.contactNo="-940774967877"
        const result = validate(item)
        expect(result.error.message).toEqual( "\"contactNo\" must be a positive number");

    });
    it('contct number must be grater than or equal to 100000000000',()=>{
        item.contactNo="1000"
        const result = validate(item)
        expect(result.error.message).toEqual("\"contactNo\" must be greater than or equal to 100000000000");

    });
    it('nic cannot be empty',()=>{
        item.nic=""
        const result = validate(item)
        expect(result.error.message).toEqual("\"nic\" is not allowed to be empty");

    });
    it('nic should not be less than 10 chars',()=>{
        item.nic="222"
        const result = validate(item)
        expect(result.error.message).toEqual("\"nic\" length must be at least 10 characters long");

    });
 

   

    






});
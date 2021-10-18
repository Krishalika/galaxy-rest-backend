const validateWaiter = require('../../models/waiter.model').validateWaiter;
let waiter;

describe ('waiter object validation process',() =>{
    beforeEach (()=>{
        waiter = {
            email:"waiter@gmail.com",
            password:"password",
            name:"amal",
            nic:"789011906V",
            salary:15000,
            contactNo:940761234567
        }
    });

    it("should return no validation issues", () =>{
        const result = validateWaiter(waiter);
        expect(result.error).toBe(undefined);
    });

    it('name cannot be empty',()=>{
        waiter.name=""
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual("\"name\" is not allowed to be empty");
    });

    it('nic cannot be empty',()=>{
        waiter.nic=""
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual("\"nic\" is not allowed to be empty");
    });

    it('nic should not be less than 10 chars',()=>{
        waiter.nic="12"
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual("\"nic\" length must be at least 10 characters long");
    });

    it('contactNo must be grater than or equal to 100000000000',()=>{
        waiter.contactNo=94078
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual("\"contactNo\" must be greater than or equal to 100000000000");
    });

    it('contactNo must be postive',()=>{
        waiter.contactNo=-940761234567
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual( "\"contactNo\" must be a positive number");

    });

    it('email is not allowed to be empty',()=>{
        waiter.email=""
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual( '"email" is not allowed to be empty');
    });
    it('email must be an email',()=>{
        waiter.email="abs45"
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual("\"email\" must be a valid email");
    });
    it('password is not allowed to be empty',()=>{
        waiter.password=""
        const result = validateWaiter(waiter)
        expect(result.error.message).toEqual('"password" is not allowed to be empty');
    });
})
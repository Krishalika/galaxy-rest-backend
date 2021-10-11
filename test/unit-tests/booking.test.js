const {validateBooking} =require('../../models/booking.model');
let item;
describe('booking validation process',()=>{
    beforeEach(()=>{
        item ={
            customerName: "Customer",
            customerEmail: "cus@gmail.com",
            customerContactNumber: "940776534567",
            startDate:"2021-10-11",
            endDate:"2021-10-12",
            room:"abcd"
       }
    });
    it('customerName cannot be empty',()=>{
        item.customerName=""
        const result = validateBooking(item)
        expect(result.error.message).toEqual( "\"customerName\" is not allowed to be empty");
    });
    it('customerEmail cannot be empty',()=>{
        item.customerEmail=""
        const result = validateBooking(item)
        expect(result.error.message).toEqual( "\"customerEmail\" is not allowed to be empty");

    });
    it('customerContactNumber cannot be empty',()=>{
        item.customerContactNumber=""
        const result = validateBooking(item)
        expect(result.error.message).toEqual( "\"customerContactNumber\" is not allowed to be empty");

    });
    it('startDate must be a date',()=>{
        item.startDate=""
        const result = validateBooking(item)
        expect(result.error.message).toEqual("\"startDate\" must be a valid date");

    });
    it('endDate  must be a date',()=>{
        item.endDate=""
        const result = validateBooking(item)
        expect(result.error.message).toEqual( "\"endDate\" must be a valid date");

    });

    // it('customerName must be a string',()=>{
    //     item.customerName="500"
    //     const result = validateBooking(item)
    //     expect(result.error.message).toEqual("\"customerName\" must be a string");

    // });

    it('customerEmail must be an email',()=>{
        item.customerEmail="custom"
        const result = validateBooking(item)
        expect(result.error.message).toEqual("\"customerEmail\" must be a valid email");
    });
});
const validateTableReservation = require("../../models/tableReservation.model").validateTableReservation;
let tableReservation;

describe("validateTableReservation validation", ()=>{
    beforeEach(()=>{
        tableReservation = {
            customerName:"Krishalika",
            customerEmail:"abc@gmail.com",
            customerContactNumber:"0723456789",
            date:"2021-10-31",
            startTime:"16:00PM",
            endTime:"17:00PM",
            price:4500,
            table:"4"
        };
    });

    it("should return no validation issues", () =>{
        const result = validateTableReservation(tableReservation);
        expect(result.error).toBe(undefined);
    });

    it("should return customerName is required", () => {
        tableReservation.customerName = undefined;
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"customerName" is required');
    });

    it("should return customerEmail is not allowed to be empty", () => {
        tableReservation.customerEmail = "";
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"customerEmail" is not allowed to be empty');
    });

    it("should return customerContactNumber is required", () => {
        tableReservation.customerContactNumber = undefined;
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"customerContactNumber" is required');
    });

    it("should return date is required", () => {
        tableReservation.date = undefined;
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"date" is required');
    });

    it("should return startTime is required", () => {
        tableReservation.startTime = undefined;
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"startTime" is required');
    });

    it("should return endTime is required", () => {
        tableReservation.endTime = undefined;
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"endTime" is required');
    });

    it("should return price is required", () => {
        tableReservation.price = undefined;
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"price" is required');
    });

    it("should return table is not allowed to be empty", () => {
        tableReservation.table = "";
        const result = validateTableReservation(tableReservation);
        expect(result.error.message).toEqual('"table" is not allowed to be empty');
    });
})
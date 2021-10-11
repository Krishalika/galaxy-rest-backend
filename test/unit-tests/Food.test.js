const {validateFood} =require('../../models/food.model');
let item;
describe('item validation process',()=>{

    beforeEach(()=>{

        item ={
            name: "MilkShake",
    description: "Cool",
    price: 150.65,
    code:"D100",
    category:"Drinks",
    status:"Available",
    img:"https://www.google.com",
    discount: 0
       }

    });
    it("should return no validation issues", () => {
        const result = validateFood(item);
        expect(result.error).toBe(undefined);
      });
    it('code cannot be empty',()=>{
        item.code=""
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"code\" is not allowed to be empty");

    });
    it('category cannot be empty',()=>{
        item.category=""
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"category\" is not allowed to be empty");

    });
    it('img cannot be empty',()=>{
        item.img=""
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"img\" is not allowed to be empty");

    });
    it('status cannot be empty',()=>{
        item.status=""
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"status\" is not allowed to be empty");

    });
    it('food item name cannot be empty',()=>{
        item.name=""
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"name\" is not allowed to be empty");

    });

    it('food item price must be a number',()=>{
        item.price="aa"
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"price\" must be a number");

    });

    it('food item price must be postive',()=>{
        item.price="-100"
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"price\" must be a positive number");

    });

    it('food item discount must be greater than or equal to zero',()=>{
        item.discount="-60"
        const result = validateFood(item)
        expect(result.error.message).toEqual("\"discount\" must be greater than or equal to 0");

    });

    it('food item description cannot be empty',()=>{
        item.description=""
        const result = validateFood(item)
        expect(result.error.message).toEqual( "\"description\" is not allowed to be empty");

    });

    






});
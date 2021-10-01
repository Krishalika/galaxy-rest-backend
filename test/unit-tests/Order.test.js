const orderValidation = require("../../models/order.model").orderValidation;
let order;

describe("orderValidation Validation", () => {
  beforeEach(() => {
    order = {
      customerName: "Kasun",
      idNumber: "973221337v",
      tableNumber: 5,
      foodItems: [
        { item: "613864d3f106b435b0a54864", soldPrice: 250.0, qty: 4 },
        { item: "6138657df106b435b0a54868", soldPrice: 257.35, qty: 4 },
      ],
    };
  });

  it("should return no validation issues", () => {
    const result = orderValidation(order);
    expect(result.error).toBe(undefined);
  });

  it("should return customerName is required", () => {
    order.customerName = undefined;
    const result = orderValidation(order);
    expect(result.error.message).toEqual('"customerName" is required');
  });

  it("should return idNumber is required", () => {
    order.idNumber = undefined;
    const result = orderValidation(order);
    expect(result.error.message).toEqual('"idNumber" is required');
  });

  it("should return tableNumber is required", () => {
    order.tableNumber = undefined;
    const result = orderValidation(order);
    expect(result.error.message).toEqual('"tableNumber" is required');
  });

  it("should return foodItems must be an array", () => {
    order.foodItems = "kasun";
    const result = orderValidation(order);
    expect(result.error.message).toEqual('"foodItems" must be an array');
  });

  it("should return foodItems is required", () => {
    order.foodItems = undefined;
    const result = orderValidation(order);
    expect(result.error.message).toEqual('"foodItems" is required');
  });
});

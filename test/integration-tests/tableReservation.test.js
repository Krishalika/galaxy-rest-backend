const request = require("supertest");
const { TableReservation } = require("../../models/tableReservation.model");
const mongoose = require("mongoose");
let { server } = require("../../index");
let { connection } = require("../../index");
server.close();

describe("/tableres", () => {
  beforeEach(() => server);
  afterEach(async () => {
    server.close();
    await TableReservation.deleteMany({});
  });
  afterAll((done) => {
    connection.close();
    done();
  });
  describe("GET /", () => {
    it("should return all table reservations", async () => {
      const tableReservation = [
        {
          table: "4",
          customerName: "Wathsala",
          date: "2021-10-30",
          startTime: "4:00 pm",
          endTime: "5:00 pm",
          price: 3500,
          customerContactNumber: 940721256739,
          customerEmail: "wathsala@gmail.com",
        },
        {
          table: "5",
          customerName: "Nirmala",
          date: "2021-10-31",
          startTime: "8:00 pm",
          endTime: "9:00 pm",
          price: 4500,
          customerContactNumber: 940721256739,
          customerEmail: "nirmala@gmail.com",
        },
      ];
      await TableReservation.collection.insertMany(tableReservation);
      const res = await request(server).get("/tableres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.table === "5")).toBeTruthy();
      expect(res.body.some((g) => g.customerName === "Nirmala")).toBeTruthy();
      expect(res.body.some((g) => g.startTime === "8:00 pm")).toBeTruthy();
      expect(res.body.some((g) => g.endTime === "9:00 pm")).toBeTruthy();
      expect(res.body.some((g) => g.price === 4500)).toBeTruthy();
      expect(
        res.body.some((g) => g.customerEmail === "nirmala@gmail.com")
      ).toBeTruthy();
    });
  });

  describe("POST /", () => {
    let table;
    let customerName;
    let date;
    let startTime;
    let endTime;
    let price;
    // let customerContactNumber;
    let customerEmail;

    const exec = async () => {
      return await request(server).post("/tableres/add").send({
        table,
        customerName,
        date,
        startTime,
        endTime,
        price,
        // customerContactNumber,
        customerEmail,
      });
    };

    beforeEach(() => {
      table = "5";
      customerName = "Nirmala";
      date = "2021-10-31";
      startTime = "8:00 pm";
      endTime = "9:00 pm";
      price = 4500;
        customerContactNumber = 940721256739;
      customerEmail = "nirmala@gmail.com";
    });

    it("should save the table reservation if it is valid", async () => {
      await exec();
      const tableReserve = await TableReservation.find({
        customerName: "Nirmala",
      });
      expect(tableReserve).not.toBeNull();
    });

    // it('should return the table reservation if it is valid', async () => {
    //     const res = await exec();

    //     expect(res.body).toHaveProperty('table', '5');
    //     expect(res.body).toHaveProperty('customerName', 'Nirmala');
    //     expect(res.body).toHaveProperty('date', "2021-10-31");
    //     expect(res.body).toHaveProperty('startTime', "8:00 pm");
    //     expect(res.body).toHaveProperty('endTime', "9:00 pm");
    //     expect(res.body).toHaveProperty('price', 4500);
    //     expect(res.body).toHaveProperty('customerContactNumber', 940721256739);

    //     expect(res.body).toHaveProperty('customerEmail', "nirmala@gmail.com");
    //   });
   
  });
});

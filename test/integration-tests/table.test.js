const request = require("supertest");
const { Table } = require("../../models/table.model");
const mongoose = require("mongoose");
let { server } = require("../../index");
let { connection } = require("../../index");
server.close();

describe("/table", () => {
  beforeEach(() => server);
  afterEach(async () => {
    server.close();
    await Table.deleteMany({});
  });
  afterAll((done) => {
    connection.close();
    done();
  });
  describe("GET /", () => {
    it("should return all tables", async () => {
      const table = [
        { seatCount: 5, status: "reserved", tableNumber: 7 },
        { seatCount: 8, status: "not reserved", tableNumber: 13 },
      ];
      await Table.collection.insertMany(table);
      const res = await request(server).get("/table");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.seatCount === 5)).toBeTruthy();
      expect(res.body.some((g) => g.status === "reserved")).toBeTruthy();
      expect(res.body.some((g) => g.tableNumber === 7)).toBeTruthy();
    });
  });

//   describe("GET /by-tableNo", () => {
//     it("should return table by table Number", async () => {
//       const table = [
//         { seatCount: 5, status: "reserved", tableNumber: 7 },
//         // { seatCount: 8, status: "not reserved", tableNumber: 13 },
//       ];
//       await Table.collection.insertMany(table);
//       const res = await request(server).get("/table/by-tableNo/7");

//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(2);
//       expect(res.body.some((g) => g.seatCount === 5)).toBeTruthy();
//       expect(res.body.some((g) => g.status === "reserved")).toBeTruthy();
//       expect(res.body.some((g) => g.tableNumber === 7)).toBeTruthy();
//     });
//   });

//   describe("GET /by-id", () => {
//     beforeEach(async () => {
//       // Before each test we need to create a table and put it in the database.
//       table = new Table({ seatCount: 5, status: "reserved", tableNumber: 7 });
//       await table.save();
//       id = table._id;
//     });

//     it("should return 404 if id is invalid", async () => {
//       id = 1;
//       const res = await exec();
//       expect(res.status).toBe(404);
//     });

//     it("should return 404 if no table with the given id was found", async () => {
//       id = mongoose.Types.ObjectId();
//       const res = await exec();
//       expect(res.status).toBe(404);
//     });
//   });

  //   describe("GET /by-id", () => {
  //     it("should return table of given ID", async () => {
  //       const table1 = [
  //         { _id: 500, seatCount: 5, status: "reserved", tableNumber: 7 },
  //       ];
  //       await Table.collection.insertMany(table1);
  //       const res = await request(server).get("/table/by-id/" + table1[0]._id);
  //       expect(res.status).toBe(200);
  //         // expect(res.body.length).toBe(2);
  //     //  expect(res.body[0]._id).toBe(500);
  //     //  expect(res.body[0].seatCount).toBe(5);
  //     //  expect(res.body[0].status).toBe("reserved");
  //     //  expect(res.body[0].tableNumber).toBe(7);

  //       expect(res.body.some((g) => g._id === 500)).toBeTruthy();
  //       expect(res.body.some((g) => g.seatCount === 5)).toBeTruthy();
  //       expect(res.body.some((g) => g.status === "reserved")).toBeTruthy();
  //       expect(res.body.some((g) => g.tableNumber === 7)).toBeTruthy();
  //     });
  //   });

  //   test("GET /api/posts/:id", async () => {
  //     const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

  //     await supertest(app).get("/api/posts/" + post.id)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body._id).toBe(post.id);
  //         expect(response.body.title).toBe(post.title);
  //         expect(response.body.content).toBe(post.content);
  //       });
  //   });
});

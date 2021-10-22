const request = require("supertest");
const { Waiter } = require("../../models/waiter.model");
let { server } = require("../../index");
let { connection } = require("../../index");

server.close();

describe("/waiterLogin", () => {
  beforeEach(() => server);
  afterEach(async () => {
    server.close();
    await Waiter.deleteMany({});
  });
  afterAll((done) => {
    connection.close();
    done();
  });

  describe("POST /", () => {
    let email;
    let password;
    const exec = async () => {
      return await request(server)
        .post("/waiters/signin")
        .send({ email, password });
    };

    beforeEach(() => {
      email = "waiter@gmail.com";
      password = "abcdef";
    });

    it("should return 400 if email is not valid", async () => {
      email = "waiter";
      password = "abcdef";
      const res = await exec();

      expect(res.status).toBe(400);
    });
  });
});

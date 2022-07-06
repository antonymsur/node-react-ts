const mongoose = require("mongoose");

import createServer from '../../server';
import request from 'supertest';

let server;

beforeAll(async() => {
    server = await createServer();
});

beforeEach((done) => {
    
  mongoose.connect("mongodb://localhost:27017/test_db",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});


test("GET /api/address", async () => {

  await request(server)
    .get("/api/address")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(0);
    });
});

test("POST /api/address", async () => {
  const data = { name: "ABC", email: "abc@abc.com", phone: "+1234567890", addrNumber: "#100", street: "7Cross", city: "Bangalore", country: "India", zip:"12345" };
    await request(server)
    .post("/api/address")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(data.name);
      expect(response.body.email).toBe(data.email);

     
    });
});

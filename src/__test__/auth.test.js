const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Log in", () => {
  test("Should Log In Successfully", async () => {
    const loginCredentials = {
      userName: "adimasfaisal",
      password: "adimas123",
    };
    const response = await request(app)
      .post("/api/auth/login")
      .send(loginCredentials);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Should Return Username Does Not Exist and Failed to Login", async () => {
    const loginCredentials = {
      userName: "wrongname",
      password: "wrongpassword",
    };
    const response = await request(app)
      .post("/api/auth/login")
      .send(loginCredentials);

    expect(response).toBeTruthy();
    expect(response.status).toBe(500);
  });

  test("Should Return Incorrect Password", async () => {
    const loginCredentials = {
      userName: "adimasfaisal",
      password: "wrongpassword",
    };
    const response = await request(app)
      .post("/api/auth/login")
      .send(loginCredentials);

    expect(response).toBeTruthy();
    expect(response.status).toBe(500);
  });
});

describe("Register", () => {
  test("Should Not Be Registered Because Invalid Email", async () => {
    const registerCredentials = {
      fullName: "Adimas Faisal",
      emailAddress: "ical123gmail.com",
      userName: "ical",
      password: "adimas123",
    };
    const response = await request(app)
      .post("/api/auth/register")
      .send(registerCredentials);

    expect(response).toBeTruthy();
    expect(response.status).toBe(400);
  });

  test("Should Be Registered Successfully", async () => {
    const registerCredentials = {
      fullName: "Adimas Faisal",
      emailAddress: "ical1234999@gmail.com",
      userName: "icalical999",
      password: "adimas123"
    };
    const response = await request(app)
      .post("/api/auth/register")
      .send(registerCredentials);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
  });
});

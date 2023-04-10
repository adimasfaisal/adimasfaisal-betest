const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const userService = require("../services/user-service");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Users", () => {
  test("Should Not Get All Users Info", async () => {
    const response = await request(app).get("/api/users");

    expect(response).toBeTruthy();
    expect(response.status).toBe(401);
  });

  test("Should Get All Users Info", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Should Get User By Id", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .get("/api/users/642e71f240a9ad3b345eb5c1")
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Success Get User");
  });

  test("Should Not Get User By Id", async () => {
    const response = await request(app).get(
      "/api/users/642e71f240a9ad3b345eb5c1"
    );

    expect(response).toBeTruthy();
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token Not Found");
  });

  test("Get User By Account Number", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .get("/api/users/account/263448951")
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Get User By Registration Number", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .get("/api/users/registration/80771")
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Succesfully Get The Users List That Has Not Logg in More Than Three Days", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .get("/api/auth/loggedin")
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Create User Info Successfully", async () => {
    const userData = {
      fullName: "Adimas Faisal",
      emailAddress: "adimasfaisal1400892@gmail.com",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .post("/api/users/create")
      .send(userData)
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Create User Info Failed Because Of Duplicate Email", async () => {
    const userData = {
      fullName: "Adimas Faisal",
      emailAddress: "adimasfaisal12@gmail.com",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .post("/api/users/create")
      .send(userData)
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "User with this email address is already exists"
    );
  });

  test("Create User Info Failed", async () => {
    const userData = {
      fullName: "Adimas Faisal",
      emailAddress: "adimasfaisal14142@gmail.com",
    };
    const response = await request(app)
      .post("/api/users/create")
      .send(userData);

    expect(response).toBeTruthy();
    expect(response.status).toBe(401);
  });

  test("Should successfully delete a user", async () => {
    const userId = "643378c2878de3f78ad3902d";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";

    const response = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");
  });

  test("Should failed delete a user with unauthorized error", async () => {
    const userId = "643378c2878de3f78ad3902d";
    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token Not Found");
  });

  test("Should Update User Info Successfully", async () => {
    const userData = {
      fullName: "AdimasFaisal",
    };
    const userId = "642e88b9632c2882cb665802";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkaW1hc2ZhaXNhbCIsInBhc3N3b3JkIjoiYWRpbWFzMTIzIiwiaWF0IjoxNjgwNzg2NzU2fQ.RvfsV8ii1RxcZE6-AQZgFTN5VthN4u7D--BmkZNc11k";
    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .send(userData)
      .set("Authorization", `Bearer ${token}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully updated user");
    expect(response.body.data.fullName).toBe(userData.fullName);
  });
});

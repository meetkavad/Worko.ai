const request = require("supertest");
const express = require("express");
const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");
require("dotenv").config();
const { connectDB, closeConnectionDB } = require("../db/connect");

const app = express();
app.use(express.json());
app.use("/worko/api", userRouter);
app.use("/worko/api/auth", authRouter);

let token; // to store jwt token
let id; // to store user id after creation of user to use it further in tests

describe("User Controller", () => {
  beforeAll(async () => {
    // connect to mongodb and start server

    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () =>
      console.log(`server is listening at port ${process.env.PORT}`)
    );

    // Login and get token
    const loginResponse = await request(app)
      .post("/worko/api/auth/login")
      .send({
        admin: "worko.ai",
        password: "worko.ai",
      });

    expect(loginResponse.statusCode).toBe(200); // checking for successful login
    token = loginResponse.body.jwt_token; // Storing token
  });

  afterAll(async () => {
    await closeConnectionDB(); // close mongoDB connection
  });

  // Creating a new user
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/worko/api/")
      .set("Authorization", `${token}`)
      .send({
        email: "obama@president.us",
        name: "Obama",
        age: 50,
        city: "washington DC",
        zipCode: "54232",
      });

    expect(response.statusCode).toBe(201);
    // checking if the user object created has the same email as the one we intended to create
    expect(response.body.new_user).toHaveProperty(
      "email",
      "obama@president.us"
    );
    id = response.body.new_user.id; // storing the id of the user created
  });

  // Getting a list of users
  it("should get a list of users", async () => {
    const response = await request(app)
      .get("/worko/api")
      .set("Authorization", `${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user_list).toBeInstanceOf(Array); // the retrieved data should be an array i.e. user_list
  });

  // Getting user details by id
  it("should get user details by id", async () => {
    const response = await request(app)
      .get(`/worko/api/${id}`)
      .set("Authorization", `${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty("id"); // the retrieved data should have id property, since we are returing whole user object here
  });

  // Updating a particular user details , the one we created above.
  it("should update user details", async () => {
    const response = await request(app)
      .patch(`/worko/api/${id}`)
      .set("Authorization", `${token}`)
      .send({
        name: "ND Modi",
        email: "modi@pm.in",
      });

    expect(response.statusCode).toBe(200); // the response is a updated user object
    expect(response.body.updated_user).toHaveProperty("name", "ND Modi"); // checking if the name is updated
    expect(response.body.updated_user).toHaveProperty("email", "modi@pm.in"); // checking if the email is updated
  });

  // deleting the user we created above
  it("should soft delete a user", async () => {
    const response = await request(app)
      .delete(`/worko/api/${id}`)
      .set("Authorization", `${token}`);

    expect(response.statusCode).toBe(200); // the resopnse is a deleted user object
    expect(response.body.deleted_user).toHaveProperty("email", "modi@pm.in"); // checking if the email is same as the one we intended to delete
  });
});

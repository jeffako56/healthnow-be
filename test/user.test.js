const request = require("supertest");
const expect = require("chai").expect;
var app = require("../routes/api");
const knex = require("../database");

describe("GET /users", function () {
  it("get all users", function () {
    request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("array");
        done();
      })
      .catch((e) => {
        console.log(e);
      });
  });
});

describe("POST /user", function () {
  it("create user", function () {
    request(app)
      .post("/users")
      .send({ first_name: "API testing rocks!" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("array");
        done();
      })
      .catch((e) => {
        console.log(e);
      });
  });
});

describe("PUT /users/:id", function () {
  before((done) => {
    knex.migrate
      .latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => done());
  });
  it("Updates a user", function () {
    request(app)
      .put("/users/1")
      .send({ first_name: "Updated task buoy" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("DeleteALL /users/deleteall", function () {
  before((done) => {
    knex.migrate
      .latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => done());
  });
  it("delete all users", function () {
    request(app)
      .delete("/users/deleteall")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("object");
        done();
      });
  });
});

describe("Delete /users/delete/id", function () {
  before((done) => {
    knex.migrate
      .latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => done());
  });
  it("delete a user", function () {
    request(app)
      .delete("/users/delete/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("object");
        done();
      });
  });
});

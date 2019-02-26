/* global describe, it, before */

import chai from "chai";
import chaiHttp from "chai-http";
import Primecontent from "../src/index";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

chai.use(chaiHttp);
chai.expect();

const expect = chai.expect;
const config = {
  token: null,
  space: "test"
};

let pc;
let currentID;

describe("Users", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-adm", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve users info", () => {
    it("users.getOne('test-rea',test') should return a valid token info", (done) => {
      pc.users.getOne("test-rea")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test-rea");
          done();
        });
    });
    it("users.getOne('test-not-found', test-no-found') should return a not found exception", (done) => {
      pc.users.getOne("test-not-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("users.getAll() should return and array of tokens", (done) => {
      pc.users.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify users info", () => {

    it("users.create() with invalid data should return no enough parameters exception", (done) => {

      let data = {};

      pc.users.create("test-rea", data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(400);
          done();
        });
    });

    it("users.create() should create a new hook called demo-hook", (done) => {

      let data = {
        username: "user-reader",
        description: "Usuario lector test",
        email: "reader@primecontent.io",
        groups: ["test-rea"],
        password: "test",
        active: true
      };

      pc.users.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("username").equal(data.username);
          done();
        });
    });

    it("users.update() should update user description", (done) => {

      let data = {
        description: "Usuario lector test updated"
      };

      pc.users.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("description").equal(data.description);
          done();
        });
    });
    it("users.delete() should return not found exception", (done) => {
      pc.users.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("users.delete() should remove user", (done) => {
      pc.users.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

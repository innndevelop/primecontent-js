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

describe("Tokens", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-adm", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve tokens info", () => {
    it("tokens.getOne('test-rea',test') should return a valid token info", (done) => {
      pc.tokens.getOne("test-rea", "test-dummy-token")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test-dummy-token");
          done();
        });
    });
    it("tokens.getOne('test-rea', test-no-found') should return a not found exception", (done) => {
      pc.tokens.getOne("test-rea", "test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("tokens.getAll('test-rea') should return and array of tokens", (done) => {
      pc.tokens.getAll("test-rea")
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify tokens info", () => {

    it("tokens.create() with invalid data should return no enough parameters exception", (done) => {

      let data = {};

      pc.tokens.create("test-rea", data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(400);
          done();
        });
    });

    it("tokens.create() should create a new token", (done) => {

      let data = {
        name: "demo-token"
      };

      pc.tokens.create("test-rea", data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("tokens.update() should update token name", (done) => {

      let data = {
        name: "demo-token-updated"
      };

      pc.tokens.update("test-rea", currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });
    it("tokens.delete() should return not found exception", (done) => {
      pc.tokens.delete("test-rea", "no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("tokens.delete() should remove token", (done) => {
      pc.tokens.delete("test-rea", currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

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

describe("Hooks", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-adm", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve Hooks info", () => {
    it("hooks.getOne('test') should return a valid hook info", (done) => {
      pc.hooks.getOne("test")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test");
          done();
        });
    });
    it("hooks.getOne('test-no-found') should return a not found exception", (done) => {
      pc.hooks.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("hooks.getAll() should return and array of hooks", (done) => {
      pc.hooks.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify hooks info", () => {

    it("hooks.create() with invalid event_name should return an unprocessable entity exception", (done) => {

      let data = {
        name: "demo-hook",
        event_name: "form.submitted_no_valid",
        end_point: "http://google.com"
      };

      pc.hooks.create(data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(422);
          done();
        });
    });

    it("hooks.create() should create a new hook", (done) => {

      let data = {
        name: "demo-hook",
        event_name: "form.submitted",
        end_point: "http://google.com"
      };

      pc.hooks.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("hooks.update() should update object name", (done) => {

      let data = {
        name: "demo-hook-updated"
      };

      pc.hooks.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });
    it("hooks.delete() should return not found exception", (done) => {
      pc.hooks.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("hooks.delete() should remove hook", (done) => {
      pc.hooks.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

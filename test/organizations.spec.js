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

describe("Organizations", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve organization info", () => {
    it("organizations.getOne() should return a valid organization info", (done) => {
      pc.organizations.getOne("test")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test");
          done();
        });
    });
    it("organizations.getOne() should return a not found exception", (done) => {
      pc.organizations.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("organizations.getAll() should return and array of organizations", (done) => {
      pc.organizations.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });
  describe("Modify organization info", () => {

    it("organizations.create() should create a new organization", (done) => {

      let data = {
        name: "demo-org"
      };

      pc.organizations.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("organizations.update() should update organization name", (done) => {

      let data = {
        name: "demo-org-updated"
      };

      pc.organizations.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("organizations.delete() should return bad request exception", (done) => {
      pc.organizations.delete(currentID).catch((err) => {
        expect(err.response.status).to.be.equal(400);
        done();
      });
    });

    it("organizations.delete() should delete previous organization test", (done) => {
      pc.organizations.delete(currentID, "demo-org-updated").then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

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

describe("Spaces", () => {

  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-adm", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve space info", () => {
    it("spaces.getOne() should return a valid space info", (done) => {
      pc.spaces.getOne(config.space)
        .then((res) => {
          expect(res.data).to.have.property("id").equal(config.space);
          done();
        });
    });
    it("spaces.getOne() should return a not found exception", (done) => {
      pc.spaces.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("spaces.getall() should return and array of spaces", (done) => {
      pc.spaces.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });
  describe("Modify space info", () => {
    it("spaces.create() without data should an bad request exception", (done) => {
      pc.spaces.create()
        .catch((err) => {
          expect(err.response.status).to.be.equal(400);
          done();
        });
    });
    it("spaces.create({name: 'demo-space'}) should create a new space called demo-space", (done) => {

      let data = {
        name: "demo-space"
      };

      pc.spaces.create(data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("spaces.update() should update space name", (done) => {

      let data = {
        name: "demo-space-updated"
      };

      pc.spaces.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("spaces.delete() should return bad request exception", (done) => {
      pc.spaces.delete(currentID).catch((err) => {
        expect(err.response.status).to.be.equal(400);
        done();
      });
    });

    it("spaces.delete() should delete previous space test", (done) => {
      pc.spaces.delete(currentID, "demo-space-updated").then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

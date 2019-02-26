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

describe("Groups", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve Groups info", () => {
    it("groups.getOne() should return a valid group info", (done) => {
      pc.groups.getOne("test-rea")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test-rea");
          done();
        });
    });
    it("groups.getOne('test-no-found') should return a not found exception", (done) => {
      pc.groups.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("groups.getAll() should return and array of groups", (done) => {
      pc.groups.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });
});

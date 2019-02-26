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

describe("Tags", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-adm", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve Tags info", () => {
    it("tags.getOne() should return a valid tag info", (done) => {
      pc.tags.getOne("test")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test");
          done();
        });
    });
    it("tags.getOne() should return a not found exception", (done) => {
      pc.tags.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("tags.getAll() should return and array of tags", (done) => {
      pc.tags.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify tags info", () => {

    it("tags.create() should create a new tag", (done) => {

      let data = {
        name: "new-tag"
      };

      pc.tags.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("tags.update() should update name", (done) => {

      let data = {
        name: "new-tag-updated"
      };

      pc.tags.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });
    it("tags.delete() should return not found exception", (done) => {
      pc.tags.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("tags.delete() should remove tag", (done) => {
      pc.tags.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

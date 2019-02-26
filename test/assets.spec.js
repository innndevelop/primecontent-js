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
let firstItem;

describe("Assets", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-dev", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve Assets info", () => {
    it("assets.getAll() should return and array of assets", (done) => {
      pc.assets.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          firstItem = res.data[0];
          done();
        });
    });

    it("entryTypes.getOne() should return a valid object", (done) => {
      let id = firstItem.id;

      pc.assets.getOne(id)
        .then((res) => {
          expect(res.data).to.have.property("id").equal(id);
          done();
        });
    });
    it("assets.getOne() should return a not found exception", (done) => {
      pc.assets.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });

  });



  describe("Modify asset info", () => {

    it("assets.create() should create a new object", (done) => {

      let testPath = "test/e1f2e5f89fd530f666053191d7838b6c.png";

      let data = {
        name: "Test image",
        file_url: "https://dummyimage.com/300/09f/test.png"
      };

      pc.assets.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("path").equal(testPath);
          done();
        });
    });

    it("assets.create() should create an not enought parameters exception", (done) => {

      let data = {
        name: ""
      };

      pc.assets.create(data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(400);
          done();
        });
    });

    it("assets.update() should update object", (done) => {

      let data = {
        name: "Asset updated"
      };

      pc.assets.update(currentID, data)
        .then((res) => {
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("assets.delete() should return not found exception", (done) => {
      pc.assets.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("assets.delete() should remove form types", (done) => {
      pc.assets.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });

});

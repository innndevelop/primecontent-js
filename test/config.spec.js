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
let firstConfig;

describe("Configs", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-adm", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve space's config info", () => {

    it("configs.getAll() should return and array of configs", (done) => {
      pc.configs.getAll()
        .then((res) => {
          firstConfig = res.data[0];
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
    it("configs.getOne() should return a not found exception", (done) => {
      pc.configs.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });


    it("configs.getOne() should return a valid config", (done) => {
      let key = firstConfig.attributes.key;

      pc.configs.getOne(key)
        .then((res) => {
          expect(res.data).to.have.property("id").equal(firstConfig.id);
          done();
        });
    });
  });
  describe("Modify config info", () => {

    it("configs.create() should create a object", (done) => {

      let data = {
        key: "demo-cfg",
        value: "demo-cfg-value",
        metadata: {
          type: "text"
        }
      };

      pc.configs.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("key").equal(data.key);
          done();
        });
    });

    it("configs.update() should update config value", (done) => {

      let data = {
        value: "demo-cfg-updated"
      };

      pc.configs.update("demo-cfg", data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("value").equal(data.value);
          done();
        });
    });

    it("configs.delete() should delete previous config test", (done) => {
      pc.configs.delete("demo-cfg").then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

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

describe("Auth", () => {

  before((done) => {
    pc = new Primecontent();
    done();
  });
  describe("Getting a method with not initialized library", () => {
    it("spaces.getAll() should return an exception", () => {
      let badFn = function () {
        pc.getSpaceInfo();
      };

      expect(badFn).to.throw();
    });
  });
  describe("Login and init SDK instance", () => {

    it("auth.login('test','test') should return a valid token", (done) => {

      let login = pc.auth.login("test-adm", "test");

      login.then((data) => {
        config.token = data.token;
        done();
      });
    });

    it("pc.init() passing valid token and space id should return true", (done) => {
      expect(pc.init(config)).to.be.true;
      done();
    });
  });

});

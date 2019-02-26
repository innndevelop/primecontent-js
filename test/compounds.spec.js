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

describe("Compounds Types", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-dev", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve compound type info", () => {
    it("compounds.getOne() should return a valid info", (done) => {
      pc.compounds.getOne("address")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("address");
          done();
        });
    });
    it("compounds.getOne() should return a not found exception", (done) => {
      pc.compounds.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("compounds.getAll() should return and array", (done) => {
      pc.compounds.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify compound info", () => {

    it("compounds.create() should create a new object", (done) => {

      let data = {
        type: "test-compound",
        name: "Compound test",
        description: "Test compound type description.",
        fields: {
          type: "object",
          additionalProperties: false,
          properties: {
            content: {
              type: "string"
            },
            mode: {
              type: "string",
              enum: [
                "html",
                "markdown",
                "simple"
              ],
              title: "Mode"
            }
          },
          required: [
            "content",
            "mode"
          ],
          title: "Text"
        },
        public: true
      };

      pc.compounds.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("compounds.create() should create an exeption by invalid schema", (done) => {

      let data = {
        type: "test-compound",
        name: "Compound test",
        description: "Test compound type description.",
        fields: {
          type: "object",
          additionalProperties: false,
          prties: {
            content: {
              type: "string"
            },
            mode: {
              type: "string",
              enum: [
                "html",
                "markdown",
                "simple"
              ],
              title: "Mode"
            }
          },
          required: [
            "content",
            "mode"
          ],
          title: "Text"
        },
        public: true
      };

      pc.compounds.create(data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(422);
          done();
        });
    });

    it("compounds.update() should update correctly", (done) => {

      let data = {
        type: "test-compound",
        name: "Compound test updated",
        description: "Test compound type description updated.",
        fields: {
          type: "object",
          additionalProperties: false,
          properties: {
            content: {
              type: "string"
            },
            mode: {
              type: "string",
              enum: [
                "html",
                "markdown",
                "simple"
              ],
              title: "Mode"
            }
          },
          required: [
            "content",
            "mode"
          ],
          title: "Text"
        },
        public: true
      };

      pc.compounds.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("compounds.delete('no-valid') should return not found exception", (done) => {
      pc.compounds.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });

    it("compounds.delete() should remove previous test object", (done) => {
      pc.compounds.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });

  });
});

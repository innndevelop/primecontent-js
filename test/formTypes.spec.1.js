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

describe("Form Types", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-dev", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve Form type info", () => {
    it("entryTypes.getOne('test') should return a valid formTypes info", (done) => {
      pc.formTypes.getOne("test")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test");
          done();
        });
    });
    it("formTypes.getOne('test-no-found') should return a not found exception", (done) => {
      pc.formTypes.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("formTypes.getAll() should return and array of formTypes", (done) => {
      pc.formTypes.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify formTypes info", () => {

    it("formTypes.create() should create a new object", (done) => {

      let data = {
        name: "new-entry-type",
        fields: {
          $schema: "http://json-schema.org/draft-06/schema#",
          title: "Simple page",
          type: "object",
          properties: {
            title: {
              "type": "string"
            },
            text: {
              $ref: "#/primecontent/address"
            }
          }
        }
      };

      pc.formTypes.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });


    it("formTypes.create() should create an exeption by invalid schema", (done) => {

      let data = {
        name: "new-entry-type",
        fields: {
          $schema: "http://json-schema.org/draft-06/schema#",
          title: "Simple page",
          type: "object",
          propes: {
            title: {
              type: "string"
            },
            text: {
              $ref: "#/primecontent/address"
            }
          }
        }
      };

      pc.entryTypes.create(data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(422);
          done();
        });
    });

    it("formTypes.update() should update object", (done) => {

      let data = {
        name: "new-entry-type-updated",
        fields: {
          $schema: "http://json-schema.org/draft-06/schema#",
          title: "Simple page updated",
          type: "object",
          properties: {
            title: {
              "type": "string"
            },
            text: {
              $ref: "#/primecontent/address"
            }
          }
        }
      };

      pc.formTypes.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("formTypes.delete() should return not found exception", (done) => {
      pc.formTypes.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("entryTypes.delete() should remove form types", (done) => {
      pc.formTypes.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

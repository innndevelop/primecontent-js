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

describe("Entry Types", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-dev", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve Entry type info", () => {
    it("entryTypes.getOne('test') should return a valid entryTypes info", (done) => {
      pc.entryTypes.getOne("test")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test");
          done();
        });
    });
    it("entryTypes.getOne('test-no-found') should return a not found exception", (done) => {
      pc.entryTypes.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("entryTypes.getAll() should return and array of entryTypes", (done) => {
      pc.entryTypes.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify entryTypes info", () => {

    it("entryTypes.create() should create a new entry types called new-entry-type", (done) => {

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

      pc.entryTypes.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });


    it("entryTypes.create() should create an exeption by invalid schema", (done) => {

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

    it("entryTypes.update(lastCreatedId, {name: 'demo-org-updated'}) should update entry type name", (done) => {

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

      pc.entryTypes.update(currentID, data)
        .then((res) => {
          currentID = res.data.id;

          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("entryTypes.delete('no-valid') should return not found exception", (done) => {
      pc.entryTypes.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("entryTypes.delete(lastCreatedId) should remove entry type", (done) => {
      pc.entryTypes.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

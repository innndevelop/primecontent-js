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
let firstVersionID;

describe("Forms", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-dev", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve Forms info", () => {
    it("entryTypes.getOne('test') should return a valid forms info", (done) => {
      pc.forms.getOne("test")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test");
          done();
        });
    });
    it("forms.getOne('test-no-found') should return a not found exception", (done) => {
      pc.forms.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("forms.getAll() should return and array of forms", (done) => {
      pc.forms.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("Modify forms info", () => {

    it("forms.create() should create a new entry types called new-entry-type", (done) => {

      let data = {
        name: "new-entry-type",
        type: "test",
        submit_url: "https://primecontent.io/thanks-page",
        fields: {
          title: "Simple form",
          slug: "test-form",
        }
      };

      pc.forms.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });


    it("forms.create() should create an exeption by invalid schema", (done) => {

      let data = {
        name: "new-entry-type-updated",
        submit_url: "https://primecontent.io/thanks-page",
        fields: {
          title: "Simple form update",
          slug: "test-form",
        }
      };

      pc.entryTypes.create(data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(422);
          done();
        });
    });

    it("forms.update() should update form", (done) => {

      let data = {
        name: "new-entry-type-updated",
        fields: {
          no_exists: "Simple form update",
          slug: "test-form"
        }
      };

      pc.forms.update(currentID, data)
        .then((res) => {
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("forms.getVersions() should return almost one version", (done) => {

      let data = {
        name: "new-form-updated",
        fields: {
          no_exists: "Simple form update",
          slug: "test-form"
        }
      };

      data.name = "New form Edited 1";
      pc.forms.update(currentID, data).then(() => {
        data.name = "New form Edited 2";
        pc.forms.update(currentID, data).then(() => {
          pc.forms.getVersions(currentID)
            .then((res) => {
              expect(res.data).to.be.an("array");
              expect(res.data.length).to.be.greaterThan(0);
              firstVersionID = res.data[1].id;
              done();
            });
        });
      });

    });

    it("forms.restoreVersion() should return restored version", (done) => {
      pc.forms.restoreVersion(currentID, firstVersionID)
        .then((res) => {
          expect(res.data).to.have.property("id").equal(currentID);
          done();
        });
    });

    it("forms.delete('no-valid') should return not found exception", (done) => {
      pc.forms.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });
    it("entryTypes.delete(lastCreatedId) should remove form types", (done) => {
      pc.forms.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });
  });
});

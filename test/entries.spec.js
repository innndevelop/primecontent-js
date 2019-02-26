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

function generateEntryObject(name, type = "test", tags = []) {

  if (!name) {
    name = "Entry " + Math.floor(Math.random() * 100);
  }

  let data = {
    name: name,
    slug: "",
    tags: tags,
    data: {
      title: "Test title",
      text: "Este es el texto en formato <b>HTML</b>"
    },
    type: type
  };

  return data;
}

let pc;
let currentID;
let firstVersionID;

describe("Entries", () => {
  before((done) => {
    pc = new Primecontent();
    let login = pc.auth.login("test-dev", "test");

    login.then((data) => {
      config.token = data.token;
      pc.init(config);
      done();
    });
  });
  describe("Retrieve entries info", () => {
    it("entries.getOne() should return a valid info", (done) => {
      pc.entries.getOne("test")
        .then((res) => {
          expect(res.data).to.have.property("id").equal("test");
          done();
        });
    });
    it("entries.getOne() should return a not found exception", (done) => {
      pc.entries.getOne("test-no-found")
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
    it("entries.getAll() should return and array", (done) => {
      pc.entries.getAll()
        .then((res) => {
          expect(res.data).to.be.an("array");
          expect(res.data.length).to.be.greaterThan(0);
          done();
        });
    });
  });
  describe("Modify entries info", () => {

    it("entries.create() should create a new object", (done) => {

      let data = generateEntryObject();

      pc.entries.create(data)
        .then((res) => {
          currentID = res.data.id;
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("entries.create() should create an exeption by invalid schema validation", (done) => {

      let data = generateEntryObject();

      data.data.title = "";

      pc.entries.create(data)
        .catch((err) => {
          expect(err.response.status).to.be.equal(400);
          done();
        });
    });

    it("entries.update() should update correctly", (done) => {

      let data = generateEntryObject();

      data.data.title = "Title edited";

      pc.entries.update(currentID, data)
        .then((res) => {
          expect(res.data).to.have.property("id");
          expect(res.data.attributes).to.have.property("name").equal(data.name);
          done();
        });
    });

    it("entries.getVersions() should return one version", (done) => {

      let data = generateEntryObject();

      data.data.title = "Title edited 1";
      pc.entries.update(currentID, data).then(() => {
        data.data.title = "Title edited 2";
        pc.entries.update(currentID, data).then(() => {
          pc.entries.getVersions(currentID)
            .then((res) => {
              expect(res.data).to.be.an("array");
              expect(res.data.length).to.be.greaterThan(0);
              firstVersionID = res.data[1].id;
              done();
            });
        });
      });

    });

    it("entries.restoreVersion() should return restored version", (done) => {
      pc.entries.restoreVersion(currentID, firstVersionID)
        .then((res) => {
          expect(res.data).to.have.property("id").equal(currentID);
          done();
        });
    });

    it("entries.delete('no-valid') should return not found exception", (done) => {
      pc.entries.delete("no-valid").catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
    });

    it("entries.delete() should remove previous test object", (done) => {
      pc.entries.delete(currentID).then((res) => {
        expect(res).to.be.empty;
        done();
      });
    });

  });
});

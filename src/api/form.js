import axios from "axios";
import API from "./base";

export default class Form extends API {

  getAll(options) {

    let params = { ...{
        page: 1,
        limit: 100
      },
      ...options
    };
    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms";

    return new Promise((ok, ko) => {
      axios.get(url, {
          params
        })
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  getOne(formID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms/" + formID;

    return new Promise((ok, ko) => {
      axios.get(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  getVersions(formID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms/" + formID + "/versions";

    return new Promise((ok, ko) => {
      axios.get(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  restoreVersion(formID, versionID) {
    let spaceID = super.currentSpace;
    let url = "/spaces/" + spaceID + "/forms/" + formID + "/versions/" + versionID;

    return new Promise((ok, ko) => {
      axios
        .put(url)
        .then(response => {
          let data = response.data;

          ok(data);
        })
        .catch(err => ko(err));
    });
  }

  update(formID, data) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms/" + formID;

    return new Promise((ok, ko) => {
      axios.put(url, data, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  create(data) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms";

    return new Promise((ok, ko) => {
      axios.post(url, data, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  delete(formID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms/" + formID;

    return new Promise((ok, ko) => {
      axios.delete(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  getSubmits(formID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms/" + formID + "/submits";

    return new Promise((ok, ko) => {
      axios.get(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  setSubmits(formID, data) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/forms/" + formID + "/submits";

    return new Promise((ok, ko) => {
      axios.post(url, data, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }
}

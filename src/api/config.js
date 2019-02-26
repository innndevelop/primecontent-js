import axios from "axios";
import API from "./base";

export default class Config extends API {

  getAll(options) {

    let params = { ...{
        page: 1,
        limit: 100
      },
      ...options
    };
    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/configs";

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

  getOne(configID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/configs/" + configID;

    return new Promise((ok, ko) => {
      axios.get(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  update(configID, data) {

    let spaceID = super.currentSpace;
    let url = "/spaces/" + spaceID + "/configs/" + configID;

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
    let url = "/spaces/" + spaceID + "/configs";

    return new Promise((ok, ko) => {
      axios.post(url, data, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  delete(configID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/configs/" + configID;

    return new Promise((ok, ko) => {
      axios.delete(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }
}

import axios from "axios";
import API from "./base";

export default class Hook extends API {

  getEvents() {
    let url = "/hooks/events";

    return new Promise((ok, ko) => {
      axios.get(url)
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  getAll(options) {

    let params = { ...{
        page: 1,
        limit: 100
      },
      ...options
    };
    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/hooks";

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

  getOne(hookID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/hooks/" + hookID;

    return new Promise((ok, ko) => {
      axios.get(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  update(hookID, data) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/hooks/" + hookID;

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

    let url = "/spaces/" + spaceID + "/hooks";

    return new Promise((ok, ko) => {
      axios.post(url, data, {
        })
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  delete(hookID) {

    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/hooks/" + hookID;

    return new Promise((ok, ko) => {
      axios.delete(url, {
        })
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }
}

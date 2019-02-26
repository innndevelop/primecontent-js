import axios from "axios";
import API from "./base";

export default class Group extends API {

  getAll(options) {

    let params = { ...{
        page: 1,
        limit: 100
      },
      ...options
    };
    let url = "/groups";

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

  getOne(id) {
    let url = "/groups/" + id;

    return new Promise((ok, ko) => {
      axios.get(url, {
        })
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  update(id, data) {
    throw new Error("Method not available");
  }

  create(data) {
    throw new Error("Method not available");
  }

  delete(id) {
    throw new Error("Method not available");
  }
}

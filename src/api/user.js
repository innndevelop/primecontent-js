import axios from "axios";
import API from "./base";

export default class User extends API {

  getAll(options) {

    let params = { ...{
        page: 1,
        limit: 100
      },
      ...options
    };
    let url = "/users";

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
    let url = "/users/" + id;

    return new Promise((ok, ko) => {
      axios.get(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  update(id, data) {

    let url = "/users/" + id;

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

    let url = "/users";

    return new Promise((ok, ko) => {
      axios.post(url, data, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  delete(id) {

    let url = "/users/" + id;

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

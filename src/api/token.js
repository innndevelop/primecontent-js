import axios from "axios";
import API from "./base";

export default class Token extends API {

  getAll(userId, options) {

    let params = { ...{
        page: 1,
        limit: 100
      },
      ...options
    };

    let url = "/users/" + userId + "/tokens";

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

  getOne(userId, id) {

    let url = "/users/" + userId + "/tokens/" + id;

    return new Promise((ok, ko) => {
      axios.get(url, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  update(userId, id, data) {

    let url = "/users/" + userId + "/tokens/" + id;

    return new Promise((ok, ko) => {
      axios.put(url, data, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  create(userId, data) {

    let url = "/users/" + userId + "/tokens";

    return new Promise((ok, ko) => {
      axios.post(url, data, {})
        .then((response) => {
          let data = response.data;

          ok(data);
        })
        .catch((err) => ko(err));
    });
  }

  delete(userId, id) {

    let url = "/users/" + userId + "/tokens/" + id;

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

import axios from "axios";
import API from "./base";

export default class Auth extends API {

  login(username, password) {
    let url = "/login";

    return new Promise((ok, ko) => {
      axios.post(url, {
          username,
          password
        })
        .then(response => {
          ok(response.data);
        })
        .catch((err) => ko(err));
    });
  }

  refresh(token) {
    let url = "/jwt/refresh";

    return new Promise((ok, ko) => {
      axios.post(url, {
          "refresh_token": token
        })
        .then(response => {
          ok(response.data);
        })
        .catch((err) => ko(err));
    });
  }

}

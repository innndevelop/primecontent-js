import axios from "axios";
import API from "./base";

export default class Entry extends API {
  getAll(options) {
    let params = {
      ...{
        page: 1,
        limit: 100
      },
      ...options
    };
    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/entries";

    return new Promise((ok, ko) => {
      axios
        .get(url, {
          params
        })
        .then(response => {
          let data = response.data;

          ok(data);
        })
        .catch(err => ko(err));
    });
  }

  getOne(entryID, options = {}) {
    let spaceID = super.currentSpace;
    let url = "/spaces/" + spaceID + "/entries/" + entryID;

    return new Promise((ok, ko) => {
      axios
        .get(url, {options})
        .then(response => {
          let data = response.data;

          ok(data);
        })
        .catch(err => ko(err));
    });
  }

  getVersions(entryID, options = {}) {
      let spaceID = super.currentSpace;
      let url = "/spaces/" + spaceID + "/entries/" + entryID + "/versions";

      return new Promise((ok, ko) => {
          axios
              .get(url, {options})
              .then(response => {
                  let data = response.data;

                  ok(data);
              })
              .catch(err => ko(err));
      });
  }

  restoreVersion(entryID, versionID) {
      let spaceID = super.currentSpace;
      let url = "/spaces/" + spaceID + "/entries/" + entryID + "/versions/" + versionID;

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

  getOneBySlug(slug, options = {}) {
    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/entries?slug=" + slug;

    return new Promise((ok, ko) => {
      axios
        .get(url, {options})
        .then(response => {
          let data = response.data;

          if (data) {
            data.data = data.data[0];
          }
          ok(data);
        })
        .catch(err => ko(err));
    });
  }

  update(entryID, data) {
    let spaceID = super.currentSpace;
    let url = "/spaces/" + spaceID + "/entries/" + entryID;

    return new Promise((ok, ko) => {
      axios
        .put(url, data)
        .then(response => {
          let data = response.data;

          ok(data);
        })
        .catch(err => ko(err));
    });
  }

  create(data) {
    let spaceID = super.currentSpace;
    let url = "/spaces/" + spaceID + "/entries";

    return new Promise((ok, ko) => {
      axios
        .post(url, data)
        .then(response => {
          let data = response.data;

          ok(data);
        })
        .catch(err => ko(err));
    });
  }

  delete(entryID) {
    let spaceID = super.currentSpace;

    let url = "/spaces/" + spaceID + "/entries/" + entryID;

    return new Promise((ok, ko) => {
      axios
        .delete(url)
        .then(response => {
          let data = response.data;

          ok(data);
        })
        .catch(err => ko(err));
    });
  }

  getEntrySchema(entryID) {
    let spaceID = super.currentSpace;
    let url = "/spaces/" + spaceID + "/entries/" + entryID + "/schema";

    return new Promise((ok, ko) => {
      axios
        .get(url)
        .then(response => {
          let data = response.data;

          ok(data);
        })
        .catch(err => ko(err));
    });
  }
}

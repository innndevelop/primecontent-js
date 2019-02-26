import axios from "axios";
import Entry from "./api/entry";
import EntryType from "./api/entryType";
import Auth from "./api/auth";
import Space from "./api/space";
import Organization from "./api/organization";
import Compound from "./api/compound";
import Form from "./api/form";
import FormType from "./api/formType";
import Hook from "./api/hook";
import Config from "./api/config";
import Tag from "./api/tag";
import Asset from "./api/asset";
import User from "./api/user";
import Token from "./api/token";
import Group from "./api/group";
import EventEmitter from "event-emitter-es6";

const CORE_DOMAIN = "https://core.primecontent.io";
const CDN_DOMAIN = "https://cdn.primecontent.io";

export default class Primecontent extends EventEmitter {

  constructor() {

    super();

    this._config = {
      mode: "jwt",
      token: "",
      "refresh_token": "",
      space: ""
    };

    axios.defaults.baseURL = CORE_DOMAIN;
    this._initialized = false;

  }

  get auth() {
    return new Auth();
  }
  get assets() {
    return this._asset;
  }

  get users() {
    return this._user;
  }

  get organizations() {
    return this._organization;
  }

  get spaces() {
    return this._space;
  }

  get entries() {
    return this._entry;
  }

  get entryTypes() {
    return this._entryType;
  }

  get forms() {
    return this._form;
  }

  get formTypes() {
    return this._formType;
  }

  get compounds() {
    return this._compound;
  }

  get hooks() {
    return this._hook;
  }

  get configs() {
    return this._defaultConfig;
  }

  get tags() {
    return this._tag;
  }

  get groups() {
    return this._group;
  }

  get tokens() {
    return this._token;
  }

  init(config) {

    this.MAX_RETRIES = 3;
    this.retry = 0;

    this._config = { ...this._config,
      ...config
    };

    this._initialized = true;

    this._asset = new Asset(config);
    this._entry = new Entry(config);
    this._entryType = new EntryType(config);
    this._user = new User(config);
    this._token = new Token(config);
    this._group = new Group(config);
    this._organization = new Organization(config);
    this._space = new Space(config);
    this._compound = new Compound(config);
    this._form = new Form(config);
    this._formType = new FormType(config);
    this._hook = new Hook(config);
    this._tag = new Tag(config);
    this._defaultConfig = new Config(config);

    if (this._config.mode === "jwt") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${config.token}`;
    } else {
      axios.defaults.baseURL = CDN_DOMAIN;
    }
    axios.interceptors.request.use((cfg) => {

      if (this._config.mode === "access_token") {
        if (!cfg.params) {
          cfg.params = {
            "access_token": this._config.token
          };
        } else {
          cfg.params["access_token"] = this._config.token;
        }
      }
      this.emit("api.request", cfg);
      return cfg;

    }, (error) => {
      this.emit("api.error");
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      this.emit("api.response", response);
      return response;
    }, (error) => {

      if (this._config.mode === "jwt" && error.response.status === 401 &&
          this._config.refresh_token && this.retry <= this.MAX_RETRIES) {

        this.retry++;

        return this.auth.refresh(this._config.refresh_token)
          .then((res) => {
            this._config.token = res.token;
            error.config.headers = {
              "Authorization": "Bearer " + res.token
            };
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
            this.emit("api.change.token", res.token);
            this.retry = 0;
            return axios.request(error.config);
          });
      }
      this.emit("api.error", error);
      return Promise.reject(error);
    });

    return true;
  }

  setCurrentSpace(space) {
    this._config.space = space;
  }

  getCurrentSpace() {
    return this._config.space;
  }
}


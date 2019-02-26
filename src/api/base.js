import EventEmitter from "event-emitter-es6";

export default class API extends EventEmitter {

  constructor(config) {
    super();
    this._config = config;
  }

  get currentSpace() {
    return this._config.space;
  }

}

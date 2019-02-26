(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("primecontent", [], factory);
	else if(typeof exports === 'object')
		exports["primecontent"] = factory();
	else
		root["primecontent"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/event-emitter-es6/index.js":
/*!*************************************************!*\
  !*** ./node_modules/event-emitter-es6/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_VALUES = {
    emitDelay: 10,
    strictMode: false
};

/**
 * @typedef {object} EventEmitterListenerFunc
 * @property {boolean} once
 * @property {function} fn
 */

/**
 * @class EventEmitter
 *
 * @private
 * @property {Object.<string, EventEmitterListenerFunc[]>} _listeners
 * @property {string[]} events
 */

var EventEmitter = function () {

    /**
     * @constructor
     * @param {{}}      [opts]
     * @param {number}  [opts.emitDelay = 10] - Number in ms. Specifies whether emit will be sync or async. By default - 10ms. If 0 - fires sync
     * @param {boolean} [opts.strictMode = false] - is true, Emitter throws error on emit error with no listeners
     */

    function EventEmitter() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_VALUES : arguments[0];

        _classCallCheck(this, EventEmitter);

        var emitDelay = void 0,
            strictMode = void 0;

        if (opts.hasOwnProperty('emitDelay')) {
            emitDelay = opts.emitDelay;
        } else {
            emitDelay = DEFAULT_VALUES.emitDelay;
        }
        this._emitDelay = emitDelay;

        if (opts.hasOwnProperty('strictMode')) {
            strictMode = opts.strictMode;
        } else {
            strictMode = DEFAULT_VALUES.strictMode;
        }
        this._strictMode = strictMode;

        this._listeners = {};
        this.events = [];
    }

    /**
     * @protected
     * @param {string} type
     * @param {function} listener
     * @param {boolean} [once = false]
     */


    _createClass(EventEmitter, [{
        key: '_addListenner',
        value: function _addListenner(type, listener, once) {
            if (typeof listener !== 'function') {
                throw TypeError('listener must be a function');
            }

            if (this.events.indexOf(type) === -1) {
                this._listeners[type] = [{
                    once: once,
                    fn: listener
                }];
                this.events.push(type);
            } else {
                this._listeners[type].push({
                    once: once,
                    fn: listener
                });
            }
        }

        /**
         * Subscribes on event type specified function
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'on',
        value: function on(type, listener) {
            this._addListenner(type, listener, false);
        }

        /**
         * Subscribes on event type specified function to fire only once
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'once',
        value: function once(type, listener) {
            this._addListenner(type, listener, true);
        }

        /**
         * Removes event with specified type. If specified listenerFunc - deletes only one listener of specified type
         * @param {string} eventType
         * @param {function} [listenerFunc]
         */

    }, {
        key: 'off',
        value: function off(eventType, listenerFunc) {
            var _this = this;

            var typeIndex = this.events.indexOf(eventType);
            var hasType = eventType && typeIndex !== -1;

            if (hasType) {
                if (!listenerFunc) {
                    delete this._listeners[eventType];
                    this.events.splice(typeIndex, 1);
                } else {
                    (function () {
                        var removedEvents = [];
                        var typeListeners = _this._listeners[eventType];

                        typeListeners.forEach(
                        /**
                         * @param {EventEmitterListenerFunc} fn
                         * @param {number} idx
                         */
                        function (fn, idx) {
                            if (fn.fn === listenerFunc) {
                                removedEvents.unshift(idx);
                            }
                        });

                        removedEvents.forEach(function (idx) {
                            typeListeners.splice(idx, 1);
                        });

                        if (!typeListeners.length) {
                            _this.events.splice(typeIndex, 1);
                            delete _this._listeners[eventType];
                        }
                    })();
                }
            }
        }

        /**
         * Applies arguments to specified event type
         * @param {string} eventType
         * @param {*[]} eventArguments
         * @protected
         */

    }, {
        key: '_applyEvents',
        value: function _applyEvents(eventType, eventArguments) {
            var typeListeners = this._listeners[eventType];

            if (!typeListeners || !typeListeners.length) {
                if (this._strictMode) {
                    throw 'No listeners specified for event: ' + eventType;
                } else {
                    return;
                }
            }

            var removableListeners = [];
            typeListeners.forEach(function (eeListener, idx) {
                eeListener.fn.apply(null, eventArguments);
                if (eeListener.once) {
                    removableListeners.unshift(idx);
                }
            });

            removableListeners.forEach(function (idx) {
                typeListeners.splice(idx, 1);
            });
        }

        /**
         * Emits event with specified type and params.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emit',
        value: function emit(type) {
            var _this2 = this;

            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                eventArgs[_key - 1] = arguments[_key];
            }

            if (this._emitDelay) {
                setTimeout(function () {
                    _this2._applyEvents.call(_this2, type, eventArgs);
                }, this._emitDelay);
            } else {
                this._applyEvents(type, eventArgs);
            }
        }

        /**
         * Emits event with specified type and params synchronously.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emitSync',
        value: function emitSync(type) {
            for (var _len2 = arguments.length, eventArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                eventArgs[_key2 - 1] = arguments[_key2];
            }

            this._applyEvents(type, eventArgs);
        }

        /**
         * Destroys EventEmitter
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this._listeners = {};
            this.events = [];
        }
    }]);

    return EventEmitter;
}();

module.exports = EventEmitter;


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/api/asset.js":
/*!**************************!*\
  !*** ./src/api/asset.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Asset =
/*#__PURE__*/
function (_API) {
  _inherits(Asset, _API);

  function Asset() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Asset);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Asset)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entity", "assets");

    return _this;
  }

  _createClass(Asset, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(Asset.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var spaceID = _get(_getPrototypeOf(Asset.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity + "/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var spaceID = _get(_getPrototypeOf(Asset.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity + "/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(Asset.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity;
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var spaceID = _get(_getPrototypeOf(Asset.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity + "/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Asset;
}(_base.default);

exports.default = Asset;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/auth.js":
/*!*************************!*\
  !*** ./src/api/auth.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Auth =
/*#__PURE__*/
function (_API) {
  _inherits(Auth, _API);

  function Auth() {
    _classCallCheck(this, Auth);

    return _possibleConstructorReturn(this, _getPrototypeOf(Auth).apply(this, arguments));
  }

  _createClass(Auth, [{
    key: "login",
    value: function login(username, password) {
      var url = "/login";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, {
          username: username,
          password: password
        }).then(function (response) {
          ok(response.data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "refresh",
    value: function refresh(token) {
      var url = "/jwt/refresh";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, {
          "refresh_token": token
        }).then(function (response) {
          ok(response.data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Auth;
}(_base.default);

exports.default = Auth;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/base.js":
/*!*************************!*\
  !*** ./src/api/base.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventEmitterEs = _interopRequireDefault(__webpack_require__(/*! event-emitter-es6 */ "./node_modules/event-emitter-es6/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var API =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(API, _EventEmitter);

  function API(config) {
    var _this;

    _classCallCheck(this, API);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(API).call(this));
    _this._config = config;
    return _this;
  }

  _createClass(API, [{
    key: "currentSpace",
    get: function get() {
      return this._config.space;
    }
  }]);

  return API;
}(_eventEmitterEs.default);

exports.default = API;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/compound.js":
/*!*****************************!*\
  !*** ./src/api/compound.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Compound =
/*#__PURE__*/
function (_API) {
  _inherits(Compound, _API);

  function Compound() {
    _classCallCheck(this, Compound);

    return _possibleConstructorReturn(this, _getPrototypeOf(Compound).apply(this, arguments));
  }

  _createClass(Compound, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(Compound.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/compound-fields";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(typeID) {
      var spaceID = _get(_getPrototypeOf(Compound.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/compound-fields/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.get(url).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(typeID, data) {
      var spaceID = _get(_getPrototypeOf(Compound.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/compound-fields/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(Compound.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/compound-fields";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(typeID) {
      var spaceID = _get(_getPrototypeOf(Compound.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/compound-fields/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Compound;
}(_base.default);

exports.default = Compound;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/config.js":
/*!***************************!*\
  !*** ./src/api/config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Config =
/*#__PURE__*/
function (_API) {
  _inherits(Config, _API);

  function Config() {
    _classCallCheck(this, Config);

    return _possibleConstructorReturn(this, _getPrototypeOf(Config).apply(this, arguments));
  }

  _createClass(Config, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(Config.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/configs";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(configID) {
      var spaceID = _get(_getPrototypeOf(Config.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/configs/" + configID;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(configID, data) {
      var spaceID = _get(_getPrototypeOf(Config.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/configs/" + configID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(Config.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/configs";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(configID) {
      var spaceID = _get(_getPrototypeOf(Config.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/configs/" + configID;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Config;
}(_base.default);

exports.default = Config;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/entry.js":
/*!**************************!*\
  !*** ./src/api/entry.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Entry =
/*#__PURE__*/
function (_API) {
  _inherits(Entry, _API);

  function Entry() {
    _classCallCheck(this, Entry);

    return _possibleConstructorReturn(this, _getPrototypeOf(Entry).apply(this, arguments));
  }

  _createClass(Entry, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(entryID) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries/" + entryID;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          options: options
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getVersions",
    value: function getVersions(entryID) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries/" + entryID + "/versions";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          options: options
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "restoreVersion",
    value: function restoreVersion(entryID, versionID) {
      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries/" + entryID + "/versions/" + versionID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOneBySlug",
    value: function getOneBySlug(slug) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries?slug=" + slug;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          options: options
        }).then(function (response) {
          var data = response.data;

          if (data) {
            data.data = data.data[0];
          }

          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(entryID, data) {
      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries/" + entryID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(entryID) {
      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries/" + entryID;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getEntrySchema",
    value: function getEntrySchema(entryID) {
      var spaceID = _get(_getPrototypeOf(Entry.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/entries/" + entryID + "/schema";
      return new Promise(function (ok, ko) {
        _axios.default.get(url).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Entry;
}(_base.default);

exports.default = Entry;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/entryType.js":
/*!******************************!*\
  !*** ./src/api/entryType.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EntryType =
/*#__PURE__*/
function (_API) {
  _inherits(EntryType, _API);

  function EntryType() {
    _classCallCheck(this, EntryType);

    return _possibleConstructorReturn(this, _getPrototypeOf(EntryType).apply(this, arguments));
  }

  _createClass(EntryType, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(EntryType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/content-types";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(typeID) {
      var spaceID = _get(_getPrototypeOf(EntryType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/content-types/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(typeID, data) {
      var spaceID = _get(_getPrototypeOf(EntryType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/content-types/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(EntryType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/content-types";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(typeID) {
      var spaceID = _get(_getPrototypeOf(EntryType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/content-types/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return EntryType;
}(_base.default);

exports.default = EntryType;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/form.js":
/*!*************************!*\
  !*** ./src/api/form.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Form =
/*#__PURE__*/
function (_API) {
  _inherits(Form, _API);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, _getPrototypeOf(Form).apply(this, arguments));
  }

  _createClass(Form, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(formID) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms/" + formID;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getVersions",
    value: function getVersions(formID) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms/" + formID + "/versions";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "restoreVersion",
    value: function restoreVersion(formID, versionID) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms/" + formID + "/versions/" + versionID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(formID, data) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms/" + formID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(formID) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms/" + formID;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getSubmits",
    value: function getSubmits(formID) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms/" + formID + "/submits";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "setSubmits",
    value: function setSubmits(formID, data) {
      var spaceID = _get(_getPrototypeOf(Form.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/forms/" + formID + "/submits";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Form;
}(_base.default);

exports.default = Form;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/formType.js":
/*!*****************************!*\
  !*** ./src/api/formType.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FormType =
/*#__PURE__*/
function (_API) {
  _inherits(FormType, _API);

  function FormType() {
    _classCallCheck(this, FormType);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormType).apply(this, arguments));
  }

  _createClass(FormType, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(FormType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/form-types";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(typeID) {
      var spaceID = _get(_getPrototypeOf(FormType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/form-types/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(typeID, data) {
      var spaceID = _get(_getPrototypeOf(FormType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/form-types/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(FormType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/form-types";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(typeID) {
      var spaceID = _get(_getPrototypeOf(FormType.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/form-types/" + typeID;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return FormType;
}(_base.default);

exports.default = FormType;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/group.js":
/*!**************************!*\
  !*** ./src/api/group.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Group =
/*#__PURE__*/
function (_API) {
  _inherits(Group, _API);

  function Group() {
    _classCallCheck(this, Group);

    return _possibleConstructorReturn(this, _getPrototypeOf(Group).apply(this, arguments));
  }

  _createClass(Group, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var url = "/groups";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var url = "/groups/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, data) {
      throw new Error("Method not available");
    }
  }, {
    key: "create",
    value: function create(data) {
      throw new Error("Method not available");
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      throw new Error("Method not available");
    }
  }]);

  return Group;
}(_base.default);

exports.default = Group;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/hook.js":
/*!*************************!*\
  !*** ./src/api/hook.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Hook =
/*#__PURE__*/
function (_API) {
  _inherits(Hook, _API);

  function Hook() {
    _classCallCheck(this, Hook);

    return _possibleConstructorReturn(this, _getPrototypeOf(Hook).apply(this, arguments));
  }

  _createClass(Hook, [{
    key: "getEvents",
    value: function getEvents() {
      var url = "/hooks/events";
      return new Promise(function (ok, ko) {
        _axios.default.get(url).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(Hook.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/hooks";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(hookID) {
      var spaceID = _get(_getPrototypeOf(Hook.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/hooks/" + hookID;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(hookID, data) {
      var spaceID = _get(_getPrototypeOf(Hook.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/hooks/" + hookID;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(Hook.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/hooks";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(hookID) {
      var spaceID = _get(_getPrototypeOf(Hook.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/hooks/" + hookID;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Hook;
}(_base.default);

exports.default = Hook;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/organization.js":
/*!*********************************!*\
  !*** ./src/api/organization.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Tag =
/*#__PURE__*/
function (_API) {
  _inherits(Tag, _API);

  function Tag() {
    _classCallCheck(this, Tag);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tag).apply(this, arguments));
  }

  _createClass(Tag, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var url = "/organizations";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var url = "/organizations/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var url = "/organizations/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var url = "/organizations";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, name) {
      var url = "/organizations/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {
          data: {
            name: name
          }
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Tag;
}(_base.default);

exports.default = Tag;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/space.js":
/*!**************************!*\
  !*** ./src/api/space.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tag =
/*#__PURE__*/
function (_API) {
  _inherits(Tag, _API);

  function Tag() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tag);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tag)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entity", "spaces");

    return _this;
  }

  _createClass(Tag, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var url = "/spaces";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var url = "/spaces/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var url = "/spaces/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var url = "/spaces";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, name) {
      var url = "/spaces/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {
          data: {
            name: name
          }
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Tag;
}(_base.default);

exports.default = Tag;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/tag.js":
/*!************************!*\
  !*** ./src/api/tag.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tag =
/*#__PURE__*/
function (_API) {
  _inherits(Tag, _API);

  function Tag() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tag);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tag)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entity", "tags");

    return _this;
  }

  _createClass(Tag, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var spaceID = _get(_getPrototypeOf(Tag.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var spaceID = _get(_getPrototypeOf(Tag.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity + "/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var spaceID = _get(_getPrototypeOf(Tag.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity + "/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var spaceID = _get(_getPrototypeOf(Tag.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity;
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var spaceID = _get(_getPrototypeOf(Tag.prototype), "currentSpace", this);

      var url = "/spaces/" + spaceID + "/" + this._entity + "/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Tag;
}(_base.default);

exports.default = Tag;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/token.js":
/*!**************************!*\
  !*** ./src/api/token.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Token =
/*#__PURE__*/
function (_API) {
  _inherits(Token, _API);

  function Token() {
    _classCallCheck(this, Token);

    return _possibleConstructorReturn(this, _getPrototypeOf(Token).apply(this, arguments));
  }

  _createClass(Token, [{
    key: "getAll",
    value: function getAll(userId, options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var url = "/users/" + userId + "/tokens";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(userId, id) {
      var url = "/users/" + userId + "/tokens/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(userId, id, data) {
      var url = "/users/" + userId + "/tokens/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(userId, data) {
      var url = "/users/" + userId + "/tokens";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(userId, id) {
      var url = "/users/" + userId + "/tokens/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return Token;
}(_base.default);

exports.default = Token;
module.exports = exports["default"];

/***/ }),

/***/ "./src/api/user.js":
/*!*************************!*\
  !*** ./src/api/user.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "./src/api/base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var User =
/*#__PURE__*/
function (_API) {
  _inherits(User, _API);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  _createClass(User, [{
    key: "getAll",
    value: function getAll(options) {
      var params = _objectSpread({}, {
        page: 1,
        limit: 100
      }, options);

      var url = "/users";
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {
          params: params
        }).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var url = "/users/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.get(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var url = "/users/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.put(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var url = "/users";
      return new Promise(function (ok, ko) {
        _axios.default.post(url, data, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var url = "/users/" + id;
      return new Promise(function (ok, ko) {
        _axios.default.delete(url, {}).then(function (response) {
          var data = response.data;
          ok(data);
        }).catch(function (err) {
          return ko(err);
        });
      });
    }
  }]);

  return User;
}(_base.default);

exports.default = User;
module.exports = exports["default"];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _primecontent = _interopRequireDefault(__webpack_require__(/*! ./primecontent.js */ "./src/primecontent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _primecontent.default;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/primecontent.js":
/*!*****************************!*\
  !*** ./src/primecontent.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _entry = _interopRequireDefault(__webpack_require__(/*! ./api/entry */ "./src/api/entry.js"));

var _entryType = _interopRequireDefault(__webpack_require__(/*! ./api/entryType */ "./src/api/entryType.js"));

var _auth = _interopRequireDefault(__webpack_require__(/*! ./api/auth */ "./src/api/auth.js"));

var _space = _interopRequireDefault(__webpack_require__(/*! ./api/space */ "./src/api/space.js"));

var _organization = _interopRequireDefault(__webpack_require__(/*! ./api/organization */ "./src/api/organization.js"));

var _compound = _interopRequireDefault(__webpack_require__(/*! ./api/compound */ "./src/api/compound.js"));

var _form = _interopRequireDefault(__webpack_require__(/*! ./api/form */ "./src/api/form.js"));

var _formType = _interopRequireDefault(__webpack_require__(/*! ./api/formType */ "./src/api/formType.js"));

var _hook = _interopRequireDefault(__webpack_require__(/*! ./api/hook */ "./src/api/hook.js"));

var _config = _interopRequireDefault(__webpack_require__(/*! ./api/config */ "./src/api/config.js"));

var _tag = _interopRequireDefault(__webpack_require__(/*! ./api/tag */ "./src/api/tag.js"));

var _asset = _interopRequireDefault(__webpack_require__(/*! ./api/asset */ "./src/api/asset.js"));

var _user = _interopRequireDefault(__webpack_require__(/*! ./api/user */ "./src/api/user.js"));

var _token = _interopRequireDefault(__webpack_require__(/*! ./api/token */ "./src/api/token.js"));

var _group = _interopRequireDefault(__webpack_require__(/*! ./api/group */ "./src/api/group.js"));

var _eventEmitterEs = _interopRequireDefault(__webpack_require__(/*! event-emitter-es6 */ "./node_modules/event-emitter-es6/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CORE_DOMAIN = "https://core.primecontent.io";
var CDN_DOMAIN = "https://cdn.primecontent.io";

var Primecontent =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Primecontent, _EventEmitter);

  function Primecontent() {
    var _this;

    _classCallCheck(this, Primecontent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Primecontent).call(this));
    _this._config = {
      mode: "jwt",
      token: "",
      "refresh_token": "",
      space: ""
    };
    _axios.default.defaults.baseURL = CORE_DOMAIN;
    _this._initialized = false;
    return _this;
  }

  _createClass(Primecontent, [{
    key: "init",
    value: function init(config) {
      var _this2 = this;

      this.MAX_RETRIES = 3;
      this.retry = 0;
      this._config = _objectSpread({}, this._config, config);
      this._initialized = true;
      this._asset = new _asset.default(config);
      this._entry = new _entry.default(config);
      this._entryType = new _entryType.default(config);
      this._user = new _user.default(config);
      this._token = new _token.default(config);
      this._group = new _group.default(config);
      this._organization = new _organization.default(config);
      this._space = new _space.default(config);
      this._compound = new _compound.default(config);
      this._form = new _form.default(config);
      this._formType = new _formType.default(config);
      this._hook = new _hook.default(config);
      this._tag = new _tag.default(config);
      this._defaultConfig = new _config.default(config);

      if (this._config.mode === "jwt") {
        _axios.default.defaults.headers.common["Authorization"] = "Bearer ".concat(config.token);
      } else {
        _axios.default.defaults.baseURL = CDN_DOMAIN;
      }

      _axios.default.interceptors.request.use(function (cfg) {
        if (_this2._config.mode === "access_token") {
          if (!cfg.params) {
            cfg.params = {
              "access_token": _this2._config.token
            };
          } else {
            cfg.params["access_token"] = _this2._config.token;
          }
        }

        _this2.emit("api.request", cfg);

        return cfg;
      }, function (error) {
        _this2.emit("api.error");

        return Promise.reject(error);
      });

      _axios.default.interceptors.response.use(function (response) {
        _this2.emit("api.response", response);

        return response;
      }, function (error) {
        if (_this2._config.mode === "jwt" && error.response.status === 401 && _this2._config.refresh_token && _this2.retry <= _this2.MAX_RETRIES) {
          _this2.retry++;
          return _this2.auth.refresh(_this2._config.refresh_token).then(function (res) {
            _this2._config.token = res.token;
            error.config.headers = {
              "Authorization": "Bearer " + res.token
            };
            _axios.default.defaults.headers.common["Authorization"] = "Bearer ".concat(res.token);

            _this2.emit("api.change.token", res.token);

            _this2.retry = 0;
            return _axios.default.request(error.config);
          });
        }

        _this2.emit("api.error", error);

        return Promise.reject(error);
      });

      return true;
    }
  }, {
    key: "setCurrentSpace",
    value: function setCurrentSpace(space) {
      this._config.space = space;
    }
  }, {
    key: "getCurrentSpace",
    value: function getCurrentSpace() {
      return this._config.space;
    }
  }, {
    key: "auth",
    get: function get() {
      return new _auth.default();
    }
  }, {
    key: "assets",
    get: function get() {
      return this._asset;
    }
  }, {
    key: "users",
    get: function get() {
      return this._user;
    }
  }, {
    key: "organizations",
    get: function get() {
      return this._organization;
    }
  }, {
    key: "spaces",
    get: function get() {
      return this._space;
    }
  }, {
    key: "entries",
    get: function get() {
      return this._entry;
    }
  }, {
    key: "entryTypes",
    get: function get() {
      return this._entryType;
    }
  }, {
    key: "forms",
    get: function get() {
      return this._form;
    }
  }, {
    key: "formTypes",
    get: function get() {
      return this._formType;
    }
  }, {
    key: "compounds",
    get: function get() {
      return this._compound;
    }
  }, {
    key: "hooks",
    get: function get() {
      return this._hook;
    }
  }, {
    key: "configs",
    get: function get() {
      return this._defaultConfig;
    }
  }, {
    key: "tags",
    get: function get() {
      return this._tag;
    }
  }, {
    key: "groups",
    get: function get() {
      return this._group;
    }
  }, {
    key: "tokens",
    get: function get() {
      return this._token;
    }
  }]);

  return Primecontent;
}(_eventEmitterEs.default);

exports.default = Primecontent;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3ByaW1lY29udGVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9ldmVudC1lbWl0dGVyLWVzNi9pbmRleC5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vc3JjL2FwaS9hc3NldC5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9zcmMvYXBpL2F1dGguanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vc3JjL2FwaS9iYXNlLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL3NyYy9hcGkvY29tcG91bmQuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vc3JjL2FwaS9jb25maWcuanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vc3JjL2FwaS9lbnRyeS5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9zcmMvYXBpL2VudHJ5VHlwZS5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9zcmMvYXBpL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vc3JjL2FwaS9mb3JtVHlwZS5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9zcmMvYXBpL2dyb3VwLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL3NyYy9hcGkvaG9vay5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9zcmMvYXBpL29yZ2FuaXphdGlvbi5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9zcmMvYXBpL3NwYWNlLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL3NyYy9hcGkvdGFnLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL3NyYy9hcGkvdG9rZW4uanMiLCJ3ZWJwYWNrOi8vcHJpbWVjb250ZW50Ly4vc3JjL2FwaS91c2VyLmpzIiwid2VicGFjazovL3ByaW1lY29udGVudC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wcmltZWNvbnRlbnQvLi9zcmMvcHJpbWVjb250ZW50LmpzIl0sIm5hbWVzIjpbIkFzc2V0Iiwib3B0aW9ucyIsInBhcmFtcyIsInBhZ2UiLCJsaW1pdCIsInNwYWNlSUQiLCJ1cmwiLCJfZW50aXR5IiwiUHJvbWlzZSIsIm9rIiwia28iLCJheGlvcyIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJjYXRjaCIsImVyciIsImlkIiwicHV0IiwicG9zdCIsImRlbGV0ZSIsIkFQSSIsIkF1dGgiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwidG9rZW4iLCJjb25maWciLCJfY29uZmlnIiwic3BhY2UiLCJFdmVudEVtaXR0ZXIiLCJDb21wb3VuZCIsInR5cGVJRCIsIkNvbmZpZyIsImNvbmZpZ0lEIiwiRW50cnkiLCJlbnRyeUlEIiwidmVyc2lvbklEIiwic2x1ZyIsIkVudHJ5VHlwZSIsIkZvcm0iLCJmb3JtSUQiLCJGb3JtVHlwZSIsIkdyb3VwIiwiRXJyb3IiLCJIb29rIiwiaG9va0lEIiwiVGFnIiwibmFtZSIsIlRva2VuIiwidXNlcklkIiwiVXNlciIsIlByaW1lY29udGVudCIsIkNPUkVfRE9NQUlOIiwiQ0ROX0RPTUFJTiIsIm1vZGUiLCJkZWZhdWx0cyIsImJhc2VVUkwiLCJfaW5pdGlhbGl6ZWQiLCJNQVhfUkVUUklFUyIsInJldHJ5IiwiX2Fzc2V0IiwiX2VudHJ5IiwiX2VudHJ5VHlwZSIsIl91c2VyIiwiX3Rva2VuIiwiX2dyb3VwIiwiX29yZ2FuaXphdGlvbiIsIk9yZ2FuaXphdGlvbiIsIl9zcGFjZSIsIlNwYWNlIiwiX2NvbXBvdW5kIiwiX2Zvcm0iLCJfZm9ybVR5cGUiLCJfaG9vayIsIl90YWciLCJfZGVmYXVsdENvbmZpZyIsImhlYWRlcnMiLCJjb21tb24iLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwidXNlIiwiY2ZnIiwiZW1pdCIsImVycm9yIiwicmVqZWN0Iiwic3RhdHVzIiwicmVmcmVzaF90b2tlbiIsImF1dGgiLCJyZWZyZXNoIiwicmVzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjtBQUN2QyxlQUFlLG1CQUFPLENBQUMsMkVBQXVCO0FBQzlDLG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjtBQUN0RCxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBOEI7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMseUVBQXFCO0FBQy9DLHlGQUF5RixtQkFBTyxDQUFD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LGFBQU8sS0FBS0QsSUFBWjtBQUNEOzs7d0JBRVk7QUFDWCxhQUFPLEtBQUtULE1BQVo7QUFDRDs7O3dCQUVZO0FBQ1gsYUFBTyxLQUFLRCxNQUFaO0FBQ0Q7Ozs7RUEzRXVDbkMsdUIiLCJmaWxlIjoicHJpbWVjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJwcmltZWNvbnRlbnRcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicHJpbWVjb250ZW50XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInByaW1lY29udGVudFwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIERFRkFVTFRfVkFMVUVTID0ge1xuICAgIGVtaXREZWxheTogMTAsXG4gICAgc3RyaWN0TW9kZTogZmFsc2Vcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gRXZlbnRFbWl0dGVyTGlzdGVuZXJGdW5jXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9uY2VcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGZuXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgRXZlbnRFbWl0dGVyXG4gKlxuICogQHByaXZhdGVcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsIEV2ZW50RW1pdHRlckxpc3RlbmVyRnVuY1tdPn0gX2xpc3RlbmVyc1xuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gZXZlbnRzXG4gKi9cblxudmFyIEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7e319ICAgICAgW29wdHNdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0cy5lbWl0RGVsYXkgPSAxMF0gLSBOdW1iZXIgaW4gbXMuIFNwZWNpZmllcyB3aGV0aGVyIGVtaXQgd2lsbCBiZSBzeW5jIG9yIGFzeW5jLiBCeSBkZWZhdWx0IC0gMTBtcy4gSWYgMCAtIGZpcmVzIHN5bmNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnN0cmljdE1vZGUgPSBmYWxzZV0gLSBpcyB0cnVlLCBFbWl0dGVyIHRocm93cyBlcnJvciBvbiBlbWl0IGVycm9yIHdpdGggbm8gbGlzdGVuZXJzXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgICAgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gREVGQVVMVF9WQUxVRVMgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50RW1pdHRlcik7XG5cbiAgICAgICAgdmFyIGVtaXREZWxheSA9IHZvaWQgMCxcbiAgICAgICAgICAgIHN0cmljdE1vZGUgPSB2b2lkIDA7XG5cbiAgICAgICAgaWYgKG9wdHMuaGFzT3duUHJvcGVydHkoJ2VtaXREZWxheScpKSB7XG4gICAgICAgICAgICBlbWl0RGVsYXkgPSBvcHRzLmVtaXREZWxheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVtaXREZWxheSA9IERFRkFVTFRfVkFMVUVTLmVtaXREZWxheTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lbWl0RGVsYXkgPSBlbWl0RGVsYXk7XG5cbiAgICAgICAgaWYgKG9wdHMuaGFzT3duUHJvcGVydHkoJ3N0cmljdE1vZGUnKSkge1xuICAgICAgICAgICAgc3RyaWN0TW9kZSA9IG9wdHMuc3RyaWN0TW9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdE1vZGUgPSBERUZBVUxUX1ZBTFVFUy5zdHJpY3RNb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0cmljdE1vZGUgPSBzdHJpY3RNb2RlO1xuXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLmV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb25jZSA9IGZhbHNlXVxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoRXZlbnRFbWl0dGVyLCBbe1xuICAgICAgICBrZXk6ICdfYWRkTGlzdGVubmVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRMaXN0ZW5uZXIodHlwZSwgbGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5ldmVudHMuaW5kZXhPZih0eXBlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBbe1xuICAgICAgICAgICAgICAgICAgICBvbmNlOiBvbmNlLFxuICAgICAgICAgICAgICAgICAgICBmbjogbGlzdGVuZXJcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKHR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IG9uY2UsXG4gICAgICAgICAgICAgICAgICAgIGZuOiBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1YnNjcmliZXMgb24gZXZlbnQgdHlwZSBzcGVjaWZpZWQgZnVuY3Rpb25cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRMaXN0ZW5uZXIodHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdWJzY3JpYmVzIG9uIGV2ZW50IHR5cGUgc3BlY2lmaWVkIGZ1bmN0aW9uIHRvIGZpcmUgb25seSBvbmNlXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvbmNlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZExpc3Rlbm5lcih0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBldmVudCB3aXRoIHNwZWNpZmllZCB0eXBlLiBJZiBzcGVjaWZpZWQgbGlzdGVuZXJGdW5jIC0gZGVsZXRlcyBvbmx5IG9uZSBsaXN0ZW5lciBvZiBzcGVjaWZpZWQgdHlwZVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtsaXN0ZW5lckZ1bmNdXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvZmYnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50VHlwZSwgbGlzdGVuZXJGdW5jKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgdHlwZUluZGV4ID0gdGhpcy5ldmVudHMuaW5kZXhPZihldmVudFR5cGUpO1xuICAgICAgICAgICAgdmFyIGhhc1R5cGUgPSBldmVudFR5cGUgJiYgdHlwZUluZGV4ICE9PSAtMTtcblxuICAgICAgICAgICAgaWYgKGhhc1R5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxpc3RlbmVyRnVuYykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNwbGljZSh0eXBlSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEV2ZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGVMaXN0ZW5lcnMgPSBfdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVMaXN0ZW5lcnMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudEVtaXR0ZXJMaXN0ZW5lckZ1bmN9IGZuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaWR4XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChmbiwgaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZuLmZuID09PSBsaXN0ZW5lckZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZEV2ZW50cy51bnNoaWZ0KGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGVMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRzLnNwbGljZSh0eXBlSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZXMgYXJndW1lbnRzIHRvIHNwZWNpZmllZCBldmVudCB0eXBlXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAgICAgICAgICogQHBhcmFtIHsqW119IGV2ZW50QXJndW1lbnRzXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19hcHBseUV2ZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYXBwbHlFdmVudHMoZXZlbnRUeXBlLCBldmVudEFyZ3VtZW50cykge1xuICAgICAgICAgICAgdmFyIHR5cGVMaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZlbnRUeXBlXTtcblxuICAgICAgICAgICAgaWYgKCF0eXBlTGlzdGVuZXJzIHx8ICF0eXBlTGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdHJpY3RNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdObyBsaXN0ZW5lcnMgc3BlY2lmaWVkIGZvciBldmVudDogJyArIGV2ZW50VHlwZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVtb3ZhYmxlTGlzdGVuZXJzID0gW107XG4gICAgICAgICAgICB0eXBlTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGVlTGlzdGVuZXIsIGlkeCkge1xuICAgICAgICAgICAgICAgIGVlTGlzdGVuZXIuZm4uYXBwbHkobnVsbCwgZXZlbnRBcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIGlmIChlZUxpc3RlbmVyLm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZhYmxlTGlzdGVuZXJzLnVuc2hpZnQoaWR4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVtb3ZhYmxlTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICAgICAgICAgIHR5cGVMaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0cyBldmVudCB3aXRoIHNwZWNpZmllZCB0eXBlIGFuZCBwYXJhbXMuXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEBwYXJhbSBldmVudEFyZ3NcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2VtaXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGV2ZW50QXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgICAgICBldmVudEFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fZW1pdERlbGF5KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMi5fYXBwbHlFdmVudHMuY2FsbChfdGhpczIsIHR5cGUsIGV2ZW50QXJncyk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5fZW1pdERlbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlFdmVudHModHlwZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0cyBldmVudCB3aXRoIHNwZWNpZmllZCB0eXBlIGFuZCBwYXJhbXMgc3luY2hyb25vdXNseS5cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgICAgICogQHBhcmFtIGV2ZW50QXJnc1xuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZW1pdFN5bmMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZW1pdFN5bmModHlwZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBldmVudEFyZ3MgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRBcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hcHBseUV2ZW50cyh0eXBlLCBldmVudEFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc3Ryb3lzIEV2ZW50RW1pdHRlclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGVzdHJveScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IFtdO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgQVBJIGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNzZXQgZXh0ZW5kcyBBUEkge1xuXG4gIF9lbnRpdHkgPSBcImFzc2V0c1wiXG5cbiAgZ2V0QWxsKG9wdGlvbnMpIHtcblxuICAgIGxldCBwYXJhbXMgPSB7Li4ue3BhZ2U6IDEsIGxpbWl0OiAxMDB9LCAuLi5vcHRpb25zIH07XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvXCIgKyB0aGlzLl9lbnRpdHk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge1xuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0T25lKGlkKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvXCIgKyB0aGlzLl9lbnRpdHkgKyBcIi9cIiArIGlkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZShpZCwgZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL1wiICsgdGhpcy5fZW50aXR5ICsgXCIvXCIgKyBpZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wdXQodXJsLCBkYXRhLCB7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL1wiICsgdGhpcy5fZW50aXR5O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnBvc3QodXJsLCBkYXRhLCB7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUoaWQpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9cIiArIHRoaXMuX2VudGl0eSArIFwiL1wiICsgaWQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZGVsZXRlKHVybCwge1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBBUEkgZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoIGV4dGVuZHMgQVBJIHtcblxuICBsb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBsZXQgdXJsID0gXCIvbG9naW5cIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wb3N0KHVybCwge1xuICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBvayhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVmcmVzaCh0b2tlbikge1xuICAgIGxldCB1cmwgPSBcIi9qd3QvcmVmcmVzaFwiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnBvc3QodXJsLCB7XG4gICAgICAgICAgXCJyZWZyZXNoX3Rva2VuXCI6IHRva2VuXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBvayhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICBnZXQgY3VycmVudFNwYWNlKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcuc3BhY2U7XG4gIH1cblxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvdW5kIGV4dGVuZHMgQVBJIHtcblxuICBnZXRBbGwob3B0aW9ucykge1xuXG4gICAgbGV0IHBhcmFtcyA9IHsgLi4ue1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBsaW1pdDogMTAwXG4gICAgICB9LFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbXBvdW5kLWZpZWxkc1wiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHtcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9uZSh0eXBlSUQpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9jb21wb3VuZC1maWVsZHMvXCIgKyB0eXBlSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSh0eXBlSUQsIGRhdGEpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9jb21wb3VuZC1maWVsZHMvXCIgKyB0eXBlSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucHV0KHVybCwgZGF0YSwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbXBvdW5kLWZpZWxkc1wiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnBvc3QodXJsLCBkYXRhLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZSh0eXBlSUQpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9jb21wb3VuZC1maWVsZHMvXCIgKyB0eXBlSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZGVsZXRlKHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZyBleHRlbmRzIEFQSSB7XG5cbiAgZ2V0QWxsKG9wdGlvbnMpIHtcblxuICAgIGxldCBwYXJhbXMgPSB7IC4uLntcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgbGltaXQ6IDEwMFxuICAgICAgfSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9jb25maWdzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge1xuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0T25lKGNvbmZpZ0lEKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvY29uZmlncy9cIiArIGNvbmZpZ0lEO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKGNvbmZpZ0lELCBkYXRhKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbmZpZ3MvXCIgKyBjb25maWdJRDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wdXQodXJsLCBkYXRhLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbmZpZ3NcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wb3N0KHVybCwgZGF0YSwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUoY29uZmlnSUQpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9jb25maWdzL1wiICsgY29uZmlnSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZGVsZXRlKHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBBUEkgZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyeSBleHRlbmRzIEFQSSB7XG4gIGdldEFsbChvcHRpb25zKSB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIC4uLntcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgbGltaXQ6IDEwMFxuICAgICAgfSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9lbnRyaWVzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLmdldCh1cmwsIHtcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0T25lKGVudHJ5SUQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZW50cmllcy9cIiArIGVudHJ5SUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLmdldCh1cmwsIHtvcHRpb25zfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VmVyc2lvbnMoZW50cnlJRCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcbiAgICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZW50cmllcy9cIiArIGVudHJ5SUQgKyBcIi92ZXJzaW9uc1wiO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgICAgIGF4aW9zXG4gICAgICAgICAgICAgIC5nZXQodXJsLCB7b3B0aW9uc30pXG4gICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ga28oZXJyKSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmVWZXJzaW9uKGVudHJ5SUQsIHZlcnNpb25JRCkge1xuICAgICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG4gICAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2VudHJpZXMvXCIgKyBlbnRyeUlEICsgXCIvdmVyc2lvbnMvXCIgKyB2ZXJzaW9uSUQ7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICAgICAgYXhpb3NcbiAgICAgICAgICAgICAgLnB1dCh1cmwpXG4gICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ga28oZXJyKSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldE9uZUJ5U2x1ZyhzbHVnLCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZW50cmllcz9zbHVnPVwiICsgc2x1ZztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAuZ2V0KHVybCwge29wdGlvbnN9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEuZGF0YSA9IGRhdGEuZGF0YVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoZW50cnlJRCwgZGF0YSkge1xuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZW50cmllcy9cIiArIGVudHJ5SUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnB1dCh1cmwsIGRhdGEpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9lbnRyaWVzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QodXJsLCBkYXRhKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUoZW50cnlJRCkge1xuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9lbnRyaWVzL1wiICsgZW50cnlJRDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RW50cnlTY2hlbWEoZW50cnlJRCkge1xuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZW50cmllcy9cIiArIGVudHJ5SUQgKyBcIi9zY2hlbWFcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgQVBJIGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlUeXBlIGV4dGVuZHMgQVBJIHtcblxuICBnZXRBbGwob3B0aW9ucykge1xuXG4gICAgbGV0IHBhcmFtcyA9IHsgLi4ue1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBsaW1pdDogMTAwXG4gICAgICB9LFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbnRlbnQtdHlwZXNcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7XG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRPbmUodHlwZUlEKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbnRlbnQtdHlwZXMvXCIgKyB0eXBlSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUodHlwZUlELCBkYXRhKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbnRlbnQtdHlwZXMvXCIgKyB0eXBlSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucHV0KHVybCwgZGF0YSwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2NvbnRlbnQtdHlwZXNcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wb3N0KHVybCwgZGF0YSwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUodHlwZUlEKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvY29udGVudC10eXBlcy9cIiArIHR5cGVJRDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5kZWxldGUodXJsLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBBUEkge1xuXG4gIGdldEFsbChvcHRpb25zKSB7XG5cbiAgICBsZXQgcGFyYW1zID0geyAuLi57XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIGxpbWl0OiAxMDBcbiAgICAgIH0sXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZm9ybXNcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7XG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRPbmUoZm9ybUlEKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZm9ybXMvXCIgKyBmb3JtSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRWZXJzaW9ucyhmb3JtSUQpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9mb3Jtcy9cIiArIGZvcm1JRCArIFwiL3ZlcnNpb25zXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICByZXN0b3JlVmVyc2lvbihmb3JtSUQsIHZlcnNpb25JRCkge1xuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZm9ybXMvXCIgKyBmb3JtSUQgKyBcIi92ZXJzaW9ucy9cIiArIHZlcnNpb25JRDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucHV0KHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKGZvcm1JRCwgZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2Zvcm1zL1wiICsgZm9ybUlEO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnB1dCh1cmwsIGRhdGEsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlKGRhdGEpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9mb3Jtc1wiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnBvc3QodXJsLCBkYXRhLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZShmb3JtSUQpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9mb3Jtcy9cIiArIGZvcm1JRDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5kZWxldGUodXJsLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN1Ym1pdHMoZm9ybUlEKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZm9ybXMvXCIgKyBmb3JtSUQgKyBcIi9zdWJtaXRzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRTdWJtaXRzKGZvcm1JRCwgZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2Zvcm1zL1wiICsgZm9ybUlEICsgXCIvc3VibWl0c1wiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnBvc3QodXJsLCBkYXRhLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1UeXBlIGV4dGVuZHMgQVBJIHtcblxuICBnZXRBbGwob3B0aW9ucykge1xuXG4gICAgbGV0IHBhcmFtcyA9IHsgLi4ue1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBsaW1pdDogMTAwXG4gICAgICB9LFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2Zvcm0tdHlwZXNcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7XG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRPbmUodHlwZUlEKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvZm9ybS10eXBlcy9cIiArIHR5cGVJRDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSh0eXBlSUQsIGRhdGEpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9mb3JtLXR5cGVzL1wiICsgdHlwZUlEO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnB1dCh1cmwsIGRhdGEsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlKGRhdGEpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9mb3JtLXR5cGVzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucG9zdCh1cmwsIGRhdGEsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlKHR5cGVJRCkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2Zvcm0tdHlwZXMvXCIgKyB0eXBlSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZGVsZXRlKHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQVBJIHtcblxuICBnZXRBbGwob3B0aW9ucykge1xuXG4gICAgbGV0IHBhcmFtcyA9IHsgLi4ue1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBsaW1pdDogMTAwXG4gICAgICB9LFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgbGV0IHVybCA9IFwiL2dyb3Vwc1wiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHtcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9uZShpZCkge1xuICAgIGxldCB1cmwgPSBcIi9ncm91cHMvXCIgKyBpZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoaWQsIGRhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGF2YWlsYWJsZVwiKTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBhdmFpbGFibGVcIik7XG4gIH1cblxuICBkZWxldGUoaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGF2YWlsYWJsZVwiKTtcbiAgfVxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvb2sgZXh0ZW5kcyBBUEkge1xuXG4gIGdldEV2ZW50cygpIHtcbiAgICBsZXQgdXJsID0gXCIvaG9va3MvZXZlbnRzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEFsbChvcHRpb25zKSB7XG5cbiAgICBsZXQgcGFyYW1zID0geyAuLi57XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIGxpbWl0OiAxMDBcbiAgICAgIH0sXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvaG9va3NcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7XG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRPbmUoaG9va0lEKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvaG9va3MvXCIgKyBob29rSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoaG9va0lELCBkYXRhKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvaG9va3MvXCIgKyBob29rSUQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucHV0KHVybCwgZGF0YSwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL2hvb2tzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucG9zdCh1cmwsIGRhdGEsIHtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZShob29rSUQpIHtcblxuICAgIGxldCBzcGFjZUlEID0gc3VwZXIuY3VycmVudFNwYWNlO1xuXG4gICAgbGV0IHVybCA9IFwiL3NwYWNlcy9cIiArIHNwYWNlSUQgKyBcIi9ob29rcy9cIiArIGhvb2tJRDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5kZWxldGUodXJsLCB7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBBUEkgZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWcgZXh0ZW5kcyBBUEkge1xuXG4gIGdldEFsbChvcHRpb25zKSB7XG5cbiAgICBsZXQgcGFyYW1zID0geyAuLi57XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIGxpbWl0OiAxMDBcbiAgICAgIH0sXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICBsZXQgdXJsID0gXCIvb3JnYW5pemF0aW9uc1wiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHtcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9uZShpZCkge1xuICAgIGxldCB1cmwgPSBcIi9vcmdhbml6YXRpb25zL1wiICsgaWQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoaWQsIGRhdGEpIHtcblxuICAgIGxldCB1cmwgPSBcIi9vcmdhbml6YXRpb25zL1wiICsgaWQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucHV0KHVybCwgZGF0YSwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YSkge1xuXG4gICAgbGV0IHVybCA9IFwiL29yZ2FuaXphdGlvbnNcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wb3N0KHVybCwgZGF0YSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZShpZCwgbmFtZSkge1xuXG4gICAgbGV0IHVybCA9IFwiL29yZ2FuaXphdGlvbnMvXCIgKyBpZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5kZWxldGUodXJsLCB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhZyBleHRlbmRzIEFQSSB7XG5cbiAgX2VudGl0eSA9IFwic3BhY2VzXCI7XG5cbiAgZ2V0QWxsKG9wdGlvbnMpIHtcblxuICAgIGxldCBwYXJhbXMgPSB7IC4uLntcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgbGltaXQ6IDEwMFxuICAgICAgfSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIGxldCB1cmwgPSBcIi9zcGFjZXNcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7XG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRPbmUoaWQpIHtcbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgaWQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoaWQsIGRhdGEpIHtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBpZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wdXQodXJsLCBkYXRhLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucG9zdCh1cmwsIGRhdGEsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlKGlkLCBuYW1lKSB7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgaWQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZGVsZXRlKHVybCwge2RhdGE6IHtuYW1lfX0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBBUEkgZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWcgZXh0ZW5kcyBBUEkge1xuXG4gIF9lbnRpdHkgPSBcInRhZ3NcIjtcblxuICBnZXRBbGwob3B0aW9ucykge1xuXG4gICAgbGV0IHBhcmFtcyA9IHsgLi4ue1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBsaW1pdDogMTAwXG4gICAgICB9LFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL1wiICsgdGhpcy5fZW50aXR5O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHtcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9uZShpZCkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL1wiICsgdGhpcy5fZW50aXR5ICsgXCIvXCIgKyBpZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5nZXQodXJsLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZShpZCwgZGF0YSkge1xuXG4gICAgbGV0IHNwYWNlSUQgPSBzdXBlci5jdXJyZW50U3BhY2U7XG5cbiAgICBsZXQgdXJsID0gXCIvc3BhY2VzL1wiICsgc3BhY2VJRCArIFwiL1wiICsgdGhpcy5fZW50aXR5ICsgXCIvXCIgKyBpZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wdXQodXJsLCBkYXRhLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvXCIgKyB0aGlzLl9lbnRpdHk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucG9zdCh1cmwsIGRhdGEsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlKGlkKSB7XG5cbiAgICBsZXQgc3BhY2VJRCA9IHN1cGVyLmN1cnJlbnRTcGFjZTtcblxuICAgIGxldCB1cmwgPSBcIi9zcGFjZXMvXCIgKyBzcGFjZUlEICsgXCIvXCIgKyB0aGlzLl9lbnRpdHkgKyBcIi9cIiArIGlkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmRlbGV0ZSh1cmwsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgQVBJIGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW4gZXh0ZW5kcyBBUEkge1xuXG4gIGdldEFsbCh1c2VySWQsIG9wdGlvbnMpIHtcblxuICAgIGxldCBwYXJhbXMgPSB7IC4uLntcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgbGltaXQ6IDEwMFxuICAgICAgfSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuXG4gICAgbGV0IHVybCA9IFwiL3VzZXJzL1wiICsgdXNlcklkICsgXCIvdG9rZW5zXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MuZ2V0KHVybCwge1xuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0T25lKHVzZXJJZCwgaWQpIHtcblxuICAgIGxldCB1cmwgPSBcIi91c2Vycy9cIiArIHVzZXJJZCArIFwiL3Rva2Vucy9cIiArIGlkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKHVzZXJJZCwgaWQsIGRhdGEpIHtcblxuICAgIGxldCB1cmwgPSBcIi91c2Vycy9cIiArIHVzZXJJZCArIFwiL3Rva2Vucy9cIiArIGlkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLnB1dCh1cmwsIGRhdGEsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlKHVzZXJJZCwgZGF0YSkge1xuXG4gICAgbGV0IHVybCA9IFwiL3VzZXJzL1wiICsgdXNlcklkICsgXCIvdG9rZW5zXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBrbykgPT4ge1xuICAgICAgYXhpb3MucG9zdCh1cmwsIGRhdGEsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlKHVzZXJJZCwgaWQpIHtcblxuICAgIGxldCB1cmwgPSBcIi91c2Vycy9cIiArIHVzZXJJZCArIFwiL3Rva2Vucy9cIiArIGlkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmRlbGV0ZSh1cmwsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgQVBJIGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIEFQSSB7XG5cbiAgZ2V0QWxsKG9wdGlvbnMpIHtcblxuICAgIGxldCBwYXJhbXMgPSB7IC4uLntcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgbGltaXQ6IDEwMFxuICAgICAgfSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIGxldCB1cmwgPSBcIi91c2Vyc1wiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHtcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9uZShpZCkge1xuICAgIGxldCB1cmwgPSBcIi91c2Vycy9cIiArIGlkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmdldCh1cmwsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKGlkLCBkYXRhKSB7XG5cbiAgICBsZXQgdXJsID0gXCIvdXNlcnMvXCIgKyBpZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wdXQodXJsLCBkYXRhLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgb2soZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBrbyhlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG5cbiAgICBsZXQgdXJsID0gXCIvdXNlcnNcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIGtvKSA9PiB7XG4gICAgICBheGlvcy5wb3N0KHVybCwgZGF0YSwge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgIG9rKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ga28oZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUoaWQpIHtcblxuICAgIGxldCB1cmwgPSBcIi91c2Vycy9cIiArIGlkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywga28pID0+IHtcbiAgICAgIGF4aW9zLmRlbGV0ZSh1cmwsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICBvayhkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGtvKGVycikpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUHJpbWVjb250ZW50IGZyb20gXCIuL3ByaW1lY29udGVudC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBQcmltZWNvbnRlbnQ7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgRW50cnkgZnJvbSBcIi4vYXBpL2VudHJ5XCI7XG5pbXBvcnQgRW50cnlUeXBlIGZyb20gXCIuL2FwaS9lbnRyeVR5cGVcIjtcbmltcG9ydCBBdXRoIGZyb20gXCIuL2FwaS9hdXRoXCI7XG5pbXBvcnQgU3BhY2UgZnJvbSBcIi4vYXBpL3NwYWNlXCI7XG5pbXBvcnQgT3JnYW5pemF0aW9uIGZyb20gXCIuL2FwaS9vcmdhbml6YXRpb25cIjtcbmltcG9ydCBDb21wb3VuZCBmcm9tIFwiLi9hcGkvY29tcG91bmRcIjtcbmltcG9ydCBGb3JtIGZyb20gXCIuL2FwaS9mb3JtXCI7XG5pbXBvcnQgRm9ybVR5cGUgZnJvbSBcIi4vYXBpL2Zvcm1UeXBlXCI7XG5pbXBvcnQgSG9vayBmcm9tIFwiLi9hcGkvaG9va1wiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9hcGkvY29uZmlnXCI7XG5pbXBvcnQgVGFnIGZyb20gXCIuL2FwaS90YWdcIjtcbmltcG9ydCBBc3NldCBmcm9tIFwiLi9hcGkvYXNzZXRcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuL2FwaS91c2VyXCI7XG5pbXBvcnQgVG9rZW4gZnJvbSBcIi4vYXBpL3Rva2VuXCI7XG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vYXBpL2dyb3VwXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudC1lbWl0dGVyLWVzNlwiO1xuXG5jb25zdCBDT1JFX0RPTUFJTiA9IFwiaHR0cHM6Ly9jb3JlLnByaW1lY29udGVudC5pb1wiO1xuY29uc3QgQ0ROX0RPTUFJTiA9IFwiaHR0cHM6Ly9jZG4ucHJpbWVjb250ZW50LmlvXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByaW1lY29udGVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgbW9kZTogXCJqd3RcIixcbiAgICAgIHRva2VuOiBcIlwiLFxuICAgICAgXCJyZWZyZXNoX3Rva2VuXCI6IFwiXCIsXG4gICAgICBzcGFjZTogXCJcIlxuICAgIH07XG5cbiAgICBheGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gQ09SRV9ET01BSU47XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICB9XG5cbiAgZ2V0IGF1dGgoKSB7XG4gICAgcmV0dXJuIG5ldyBBdXRoKCk7XG4gIH1cbiAgZ2V0IGFzc2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzZXQ7XG4gIH1cblxuICBnZXQgdXNlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXI7XG4gIH1cblxuICBnZXQgb3JnYW5pemF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JnYW5pemF0aW9uO1xuICB9XG5cbiAgZ2V0IHNwYWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3BhY2U7XG4gIH1cblxuICBnZXQgZW50cmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50cnk7XG4gIH1cblxuICBnZXQgZW50cnlUeXBlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50cnlUeXBlO1xuICB9XG5cbiAgZ2V0IGZvcm1zKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICB9XG5cbiAgZ2V0IGZvcm1UeXBlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybVR5cGU7XG4gIH1cblxuICBnZXQgY29tcG91bmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wb3VuZDtcbiAgfVxuXG4gIGdldCBob29rcygpIHtcbiAgICByZXR1cm4gdGhpcy5faG9vaztcbiAgfVxuXG4gIGdldCBjb25maWdzKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q29uZmlnO1xuICB9XG5cbiAgZ2V0IHRhZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhZztcbiAgfVxuXG4gIGdldCBncm91cHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwO1xuICB9XG5cbiAgZ2V0IHRva2VucygpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9rZW47XG4gIH1cblxuICBpbml0KGNvbmZpZykge1xuXG4gICAgdGhpcy5NQVhfUkVUUklFUyA9IDM7XG4gICAgdGhpcy5yZXRyeSA9IDA7XG5cbiAgICB0aGlzLl9jb25maWcgPSB7IC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH07XG5cbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICB0aGlzLl9hc3NldCA9IG5ldyBBc3NldChjb25maWcpO1xuICAgIHRoaXMuX2VudHJ5ID0gbmV3IEVudHJ5KGNvbmZpZyk7XG4gICAgdGhpcy5fZW50cnlUeXBlID0gbmV3IEVudHJ5VHlwZShjb25maWcpO1xuICAgIHRoaXMuX3VzZXIgPSBuZXcgVXNlcihjb25maWcpO1xuICAgIHRoaXMuX3Rva2VuID0gbmV3IFRva2VuKGNvbmZpZyk7XG4gICAgdGhpcy5fZ3JvdXAgPSBuZXcgR3JvdXAoY29uZmlnKTtcbiAgICB0aGlzLl9vcmdhbml6YXRpb24gPSBuZXcgT3JnYW5pemF0aW9uKGNvbmZpZyk7XG4gICAgdGhpcy5fc3BhY2UgPSBuZXcgU3BhY2UoY29uZmlnKTtcbiAgICB0aGlzLl9jb21wb3VuZCA9IG5ldyBDb21wb3VuZChjb25maWcpO1xuICAgIHRoaXMuX2Zvcm0gPSBuZXcgRm9ybShjb25maWcpO1xuICAgIHRoaXMuX2Zvcm1UeXBlID0gbmV3IEZvcm1UeXBlKGNvbmZpZyk7XG4gICAgdGhpcy5faG9vayA9IG5ldyBIb29rKGNvbmZpZyk7XG4gICAgdGhpcy5fdGFnID0gbmV3IFRhZyhjb25maWcpO1xuICAgIHRoaXMuX2RlZmF1bHRDb25maWcgPSBuZXcgQ29uZmlnKGNvbmZpZyk7XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLm1vZGUgPT09IFwiand0XCIpIHtcbiAgICAgIGF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHtjb25maWcudG9rZW59YDtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpb3MuZGVmYXVsdHMuYmFzZVVSTCA9IENETl9ET01BSU47XG4gICAgfVxuICAgIGF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZSgoY2ZnKSA9PiB7XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcubW9kZSA9PT0gXCJhY2Nlc3NfdG9rZW5cIikge1xuICAgICAgICBpZiAoIWNmZy5wYXJhbXMpIHtcbiAgICAgICAgICBjZmcucGFyYW1zID0ge1xuICAgICAgICAgICAgXCJhY2Nlc3NfdG9rZW5cIjogdGhpcy5fY29uZmlnLnRva2VuXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZmcucGFyYW1zW1wiYWNjZXNzX3Rva2VuXCJdID0gdGhpcy5fY29uZmlnLnRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoXCJhcGkucmVxdWVzdFwiLCBjZmcpO1xuICAgICAgcmV0dXJuIGNmZztcblxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgdGhpcy5lbWl0KFwiYXBpLmVycm9yXCIpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9KTtcblxuICAgIGF4aW9zLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoKHJlc3BvbnNlKSA9PiB7XG4gICAgICB0aGlzLmVtaXQoXCJhcGkucmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0sIChlcnJvcikgPT4ge1xuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLm1vZGUgPT09IFwiand0XCIgJiYgZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgJiZcbiAgICAgICAgICB0aGlzLl9jb25maWcucmVmcmVzaF90b2tlbiAmJiB0aGlzLnJldHJ5IDw9IHRoaXMuTUFYX1JFVFJJRVMpIHtcblxuICAgICAgICB0aGlzLnJldHJ5Kys7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aC5yZWZyZXNoKHRoaXMuX2NvbmZpZy5yZWZyZXNoX3Rva2VuKVxuICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy50b2tlbiA9IHJlcy50b2tlbjtcbiAgICAgICAgICAgIGVycm9yLmNvbmZpZy5oZWFkZXJzID0ge1xuICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyByZXMudG9rZW5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBheGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbltcIkF1dGhvcml6YXRpb25cIl0gPSBgQmVhcmVyICR7cmVzLnRva2VufWA7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJhcGkuY2hhbmdlLnRva2VuXCIsIHJlcy50b2tlbik7XG4gICAgICAgICAgICB0aGlzLnJldHJ5ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBheGlvcy5yZXF1ZXN0KGVycm9yLmNvbmZpZyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoXCJhcGkuZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc2V0Q3VycmVudFNwYWNlKHNwYWNlKSB7XG4gICAgdGhpcy5fY29uZmlnLnNwYWNlID0gc3BhY2U7XG4gIH1cblxuICBnZXRDdXJyZW50U3BhY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zcGFjZTtcbiAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9
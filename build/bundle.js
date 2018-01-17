/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typecheck = __webpack_require__(5);

var _typecheck2 = _interopRequireDefault(_typecheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListenerManager = function () {
    function ListenerManager() {
        _classCallCheck(this, ListenerManager);

        this.listeners = {}; // 形如{name:[watcher1,watcher2]}
    }

    _createClass(ListenerManager, [{
        key: 'add',
        value: function add(listeners) {
            var _this = this;

            if (_typecheck2.default.isObject(listeners)) {
                this._addListener(listeners);
            } else if (_typecheck2.default.isArray(listeners)) {
                listeners.forEach(function (listener) {
                    _this._addListener(listener);
                });
            }
        }
    }, {
        key: '_addListener',
        value: function _addListener(listener) {
            if (listener && listener.name) {
                var listenerName = listener.name;
                if (!this.listeners[listenerName]) {
                    this.listeners[listenerName] = [];
                }
                this.listeners[listenerName].push(listener);
            }
        }
    }, {
        key: 'notify',
        value: function notify(value, listenerName) {
            this.listeners[listenerName].forEach(function (listener) {
                listener.update(value, listenerName);
            });
        }
    }]);

    return ListenerManager;
}();

exports.default = ListenerManager;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function () {
    function Listener() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            callback = _ref.callback,
            name = _ref.name,
            context = _ref.context;

        _classCallCheck(this, Listener);

        this.callback = callback;
        this.name = name;
        this.context = context;
    }

    _createClass(Listener, [{
        key: "update",
        value: function update(newValue, name) {
            if (this.callback) {
                var funcContext = this.context || this;
                this.callback(newValue, name, funcContext);
            }
        }
    }]);

    return Listener;
}();

exports.default = Listener;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mvvm = __webpack_require__(3);

var _mvvm2 = _interopRequireDefault(_mvvm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _mvvm2.default({
    el: '#app',
    data: {
        name: 'liasdf',
        age: 123
    }
});

document.getElementById('btn').onclick = function () {
    app.name = 'asdf';
};

// import Listener from './listener'
// import ListenerManager from './listenermanager'

// var listener1 = new Listener({
//     callback: function (value) {
//         alert('listener1 type1:' + value)
//     },
//     name: 'type1'
// })

// var listener2 = new Listener({
//     callback: function (value) {
//         alert('listener2 type1' + value)
//     },
//     name: 'type1'
// });

// var listener3 = new Listener({
//     callback: function (value) {
//         alert('listener3 type2' + value)
//     },
//     name: 'type2'
// });

// var listenerManager = new ListenerManager();
// listenerManager.add([listener1, listener2, listener3]);

// listenerManager.notify('a1a2a3', 'type2');

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observer = __webpack_require__(4);

var _observer2 = _interopRequireDefault(_observer);

var _htmlcompiler = __webpack_require__(6);

var _htmlcompiler2 = _interopRequireDefault(_htmlcompiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MVVM = function () {
    function MVVM() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            data = _ref.data,
            el = _ref.el;

        _classCallCheck(this, MVVM);

        this.data = data;
        this._createDataProxy(data);
        this._mvvmObserver = new _observer2.default({ data: data });
        this._htmlCompiler = new _htmlcompiler2.default(el, this, this._mvvmObserver.getListenerManager());
    }

    _createClass(MVVM, [{
        key: '_createDataProxy',
        value: function _createDataProxy(data) {
            var self = this;
            Object.keys(data).forEach(function (key) {
                self._createDataKeyProxy(data, key, data[key]);
            });
        }
    }, {
        key: '_createDataKeyProxy',
        value: function _createDataKeyProxy(data, key, value) {
            Object.defineProperty(this, key, {
                get: function get() {
                    return data[key];
                },
                set: function set(newValue) {
                    data[key] = newValue;
                }
            });
        }
    }]);

    return MVVM;
}();

exports.default = MVVM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listenermanager = __webpack_require__(0);

var _listenermanager2 = _interopRequireDefault(_listenermanager);

var _listener = __webpack_require__(1);

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
    function Observer() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            data = _ref.data;

        _classCallCheck(this, Observer);

        this.data = data;
        this._listenerManager = new _listenermanager2.default();
        this._initData(this.data);
    }

    _createClass(Observer, [{
        key: '_initData',
        value: function _initData(data) {
            var _this = this;

            Object.keys(data).forEach(function (key) {
                _this._defineReactive(data, key, data[key]);
            });
        }
    }, {
        key: 'getListenerManager',
        value: function getListenerManager() {
            return this._listenerManager;
        }
    }, {
        key: '_defineReactive',
        value: function _defineReactive(data, key, value) {
            var self = this;

            this._listenerManager.add(new _listener2.default({
                name: key
            }));

            Object.defineProperty(data, key, {
                set: function set(newValue) {
                    value = newValue;
                    self._listenerManager.notify(newValue, key);
                },
                get: function get() {
                    return value;
                }
            });
        }
    }]);

    return Observer;
}();

exports.default = Observer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    isArray: function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isObject: function isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listenermanager = __webpack_require__(0);

var _listenermanager2 = _interopRequireDefault(_listenermanager);

var _listener = __webpack_require__(1);

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementCheck = {
    isHTMLElement: function isHTMLElement(element) {
        return element.nodeType === 1;
    },
    isTextNode: function isTextNode(element) {
        return element.nodeType === 3;
    },
    isVModel: function isVModel(element) {
        return !!element.getAttribute('v-model');
    },
    isVBind: function isVBind(element) {
        return !!element.getAttribute('v-bind');
    }
};

var REGEXPS = {
    TEXTNODE: /{{(\w*)}}/g
};

var Callbacks = {
    vmodel: function vmodel(newValue, name, context) {
        context.value = newValue;
    },
    textnode: function textnode(newValue, name, context) {
        var regNodeValue = context._beforeCompileValue;
        var mvvmData = this._mvvm.data;

        Object.keys(mvvmData).forEach(function (key) {
            var regKey = new RegExp('{{' + key + '}}', 'g');
            var value = mvvmData[key];
            regNodeValue = regNodeValue.replace(regKey, value);
        });

        context.nodeValue = regNodeValue;
    }
};

var HTMLCompiler = function () {
    function HTMLCompiler(el, mvvm, listenerManager) {
        _classCallCheck(this, HTMLCompiler);

        this._mvvm = mvvm;
        this._listenerManager = listenerManager;
        this.rootElement = document.querySelector(el);
        this.dataElements = [];
        this._textNodesCache = [];
        if (this.rootElement) {
            this.compile(this.rootElement);
        } else {
            console.error('未找到根元素，请设置el选项');
        }
    }

    _createClass(HTMLCompiler, [{
        key: 'compile',
        value: function compile(element) {
            var _this = this;

            if (element.childNodes && element.childNodes.length > 0) {
                element.childNodes.forEach(function (childNode) {
                    _this.compile(childNode);
                });
            } else {
                this.compileElement(element);
            }
        }
    }, {
        key: 'compileElement',
        value: function compileElement(element) {
            if (ElementCheck.isHTMLElement(element)) {
                this.compileHTMLElement(element);
            } else if (ElementCheck.isTextNode(element)) {
                this.compileTextNode(element);
            }
        }
    }, {
        key: 'compileHTMLElement',
        value: function compileHTMLElement(element) {
            if (ElementCheck.isVModel(element)) {
                this.compileVModel(element);
            }
        }
    }, {
        key: 'compileTextNode',
        value: function compileTextNode(element) {

            if (element.nodeValue.trim() == '') {
                return;
            }

            var regNodeValue = element.nodeValue,
                compliledNodeValue = element.nodeValue,
                key = '',
                replacedKey = '',
                regResult = REGEXPS.TEXTNODE.exec(regNodeValue);
            element._beforeCompileValue = regNodeValue;
            while (regResult) {
                replacedKey = regResult[0];
                key = regResult[1];

                compliledNodeValue = compliledNodeValue.replace(replacedKey, this._mvvm[key]);

                this.addToListenerManager(key, Callbacks.textnode.bind(this), element);

                regResult = REGEXPS.TEXTNODE.exec(regNodeValue);
            }
            element.nodeValue = compliledNodeValue;
        }
    }, {
        key: 'compileVModel',
        value: function compileVModel(element) {
            var _this2 = this;

            var key = element.getAttribute('v-model');

            this.addToListenerManager(key, Callbacks.vmodel.bind(this), element);

            element.addEventListener('input', function () {
                _this2._mvvm[key] = element.value;
            });

            element.value = this._mvvm[key];
        }
    }, {
        key: 'addToListenerManager',
        value: function addToListenerManager(key, func, context) {
            this._listenerManager.add(new _listener2.default({
                name: key,
                callback: func,
                context: context
            }));
        }
    }]);

    return HTMLCompiler;
}();

exports.default = HTMLCompiler;

/***/ })
/******/ ]);
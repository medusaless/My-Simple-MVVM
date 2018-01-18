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
        age: 12322
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

var AttrChangeCallbacks = {
    vmodel: function vmodel(newValue, name, context) {
        context.value = newValue;
    },
    textnode: function textnode(originNodeValue) {
        return function (newValue, name, context) {
            var mvvmData = this._mvvm.data;
            var compiledNodeValue = originNodeValue;
            var dataKeys = Object.keys(mvvmData);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = dataKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var tokenReg = new RegExp('{{(' + key + ')}}', 'g');
                    compiledNodeValue = replaceToken(tokenReg, compiledNodeValue, this._mvvm.data);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            context.nodeValue = compiledNodeValue;
        };
    }
};

var replaceToken = function replaceToken(tokenReg, str, data) {
    debugger;
    var dataKey = '';
    var regResult = tokenReg.exec(str);
    if (regResult) {
        dataKey = regResult[1];
        str = str.replace(tokenReg, data[dataKey]);
    }
    return str;
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
            var textNodeValue = element.nodeValue.trim();
            if (textNodeValue == '') {
                return;
            }

            var mvvmData = this._mvvm.data;
            var compiledNodeValue = textNodeValue;
            var originNodeValue = textNodeValue;
            var tokenKey = '',
                datakey = '';

            var regOneKeyResult = REGEXPS.TEXTNODE.exec(compiledNodeValue);

            while (regOneKeyResult) {
                datakey = regOneKeyResult[1];
                var tokenReg = new RegExp('{{(' + datakey + ')}}', 'g');
                compiledNodeValue = replaceToken(tokenReg, compiledNodeValue, mvvmData);
                this.addTokenListener(datakey, AttrChangeCallbacks.textnode(originNodeValue).bind(this), element);
                regOneKeyResult = REGEXPS.TEXTNODE.exec(compiledNodeValue);
            }

            element.nodeValue = compiledNodeValue;
        }
    }, {
        key: 'compileVModel',
        value: function compileVModel(element) {
            var _this2 = this;

            var key = element.getAttribute('v-model');
            element.addEventListener('input', function () {
                _this2._mvvm[key] = element.value;
            });
            element.value = this._mvvm[key];
            this.addTokenListener(key, AttrChangeCallbacks.vmodel.bind(this), element);
        }
    }, {
        key: 'addTokenListener',
        value: function addTokenListener(key, func, context) {
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
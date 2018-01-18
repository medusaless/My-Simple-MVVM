import ListenerManager from './listenermanager'
import Listener from './listener'

var ElementCheck = {
    isHTMLElement(element) {
        return element.nodeType === 1;
    },
    isTextNode(element) {
        return element.nodeType === 3;
    },
    isVModel(element) {
        return !!element.getAttribute('v-model');
    },
    isVBind(element) {
        return !!element.getAttribute('v-bind');
    }
}

var REGEXPS = {
    TEXTNODE: /{{(\w*)}}/g
};

var AttrChangeCallbacks = {
    vmodel: function (newValue, name, context) {
        context.value = newValue;
    },
    textnode: function (originNodeValue) {
        return function (newValue, name, context) {
            var mvvmData = this._mvvm.data;
            var compiledNodeValue = originNodeValue;
            var dataKeys = Object.keys(mvvmData);

            for (let key of dataKeys) {
                var tokenReg = new RegExp('{{(' + key + ')}}','g');
                compiledNodeValue = replaceToken(tokenReg, compiledNodeValue, this._mvvm.data);
            }
            context.nodeValue = compiledNodeValue;
        }
    }
}


var replaceToken = function (tokenReg, str, data) {
    debugger;
    var dataKey = '';
    var regResult = tokenReg.exec(str);
    if (regResult) {
        dataKey = regResult[1];
        str = str.replace(tokenReg, data[dataKey]);
    }
    return str;
}

export default class HTMLCompiler {
    constructor(el, mvvm, listenerManager) {
        this._mvvm = mvvm;
        this._listenerManager = listenerManager;
        this.rootElement = document.querySelector(el);
        this.dataElements = [];
        this._textNodesCache = [];
        if (this.rootElement) {
            this.compile(this.rootElement)
        } else {
            console.error('未找到根元素，请设置el选项');
        }
    }

    compile(element) {
        if (element.childNodes && element.childNodes.length > 0) {
            element.childNodes.forEach(childNode => {
                this.compile(childNode);
            });
        } else {
            this.compileElement(element)
        }
    }

    compileElement(element) {
        if (ElementCheck.isHTMLElement(element)) {
            this.compileHTMLElement(element);
        } else if (ElementCheck.isTextNode(element)) {
            this.compileTextNode(element);
        }
    }

    compileHTMLElement(element) {
        if (ElementCheck.isVModel(element)) {
            this.compileVModel(element);
        }
    }

    compileTextNode(element) {
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
            var tokenReg = new RegExp('{{(' + datakey + ')}}','g');
            compiledNodeValue = replaceToken(tokenReg, compiledNodeValue, mvvmData)
            this.addTokenListener(datakey, AttrChangeCallbacks.textnode(originNodeValue).bind(this), element);
            regOneKeyResult = REGEXPS.TEXTNODE.exec(compiledNodeValue);
        }
      
        element.nodeValue = compiledNodeValue;
    }

    compileVModel(element) {
        let key = element.getAttribute('v-model');
        element.addEventListener('input', () => {
            this._mvvm[key] = element.value;
        });
        element.value = this._mvvm[key];
        this.addTokenListener(key, AttrChangeCallbacks.vmodel.bind(this), element)
    }

    addTokenListener(key, func, context) {
        this._listenerManager.add(new Listener({
            name: key,
            callback: func,
            context: context
        }));
    }
}
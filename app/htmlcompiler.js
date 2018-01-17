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

var Callbacks = {
    vmodel: function (newValue, name, context) {
        context.value = newValue;
    },
    textnode: function (newValue, name, context) {
        var regNodeValue = context._beforeCompileValue;
        var mvvmData = this._mvvm.data;

        Object.keys(mvvmData).forEach(key => {
            var regKey = new RegExp('{{' + key + '}}','g');
            var value =  mvvmData[key];
            regNodeValue = regNodeValue.replace(regKey, value);
        });

        context.nodeValue = regNodeValue;
    }
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

            compliledNodeValue = compliledNodeValue.replace(replacedKey, this._mvvm[key])

            this.addToListenerManager(key, Callbacks.textnode.bind(this), element)

            regResult = REGEXPS.TEXTNODE.exec(regNodeValue);
        }
        element.nodeValue = compliledNodeValue;
    }

    compileVModel(element) {
        let key = element.getAttribute('v-model');

        this.addToListenerManager(key, Callbacks.vmodel.bind(this), element)

        element.addEventListener('input', () => {
            this._mvvm[key] = element.value;
        });

        element.value = this._mvvm[key];
    }

    addToListenerManager(key, func, context) {
        this._listenerManager.add(new Listener({
            name: key,
            callback: func,
            context: context
        }));
    }
}
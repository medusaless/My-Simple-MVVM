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

var RegExpressions = {
    textNodeReg: /{{(.*)}}/
};

var Callbacks = {
    vmodel: function (newValue, name, context) {
        context.value = newValue;
    },
    textnode: function (newValue, name, context) {
        context.nodeValue = newValue;
    }
}

export default class HTMLCompiler {
    constructor(el, mvvm, listenerManager) {
        this._mvvm = mvvm;
        this._listenerManager = listenerManager;
        this.rootElement = document.querySelector(el);
        this.dataElements = [];
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
        if (RegExpressions.textNodeReg.test(element.nodeValue)) {
            var key = RegExp.$1;
            this.addToListenerManager(key, Callbacks.textnode, element)

            element.nodeValue = this._mvvm[key];
        }
    }

    compileVModel(element) {
        let key = element.getAttribute('v-model');

        this.addToListenerManager(key, Callbacks.vmodel, element)

        element.addEventListener('input', () => {
            this._mvvm[key] = element.value;
        });

        element.value = this._mvvm[key];
    }

    addToListenerManager(key, func, context) {
        this._listenerManager.add(new Listener({
            name: key,
            callback: func,
            context:context
        }));
    }
}
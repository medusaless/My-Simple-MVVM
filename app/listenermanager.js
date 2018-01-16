import TypeCheck from './typecheck'

export default class ListenerManager {
    constructor() {
        this.listeners = {}  // 形如{name:[watcher1,watcher2]}
    }

    add(listeners) {
        if (TypeCheck.isObject(listeners)) {
            this._addListener(listeners)
        } else if (TypeCheck.isArray(listeners)) {
            listeners.forEach(listener => {
                this._addListener(listener);
            })
        }
    }

    _addListener(listener) {
        if (listener && listener.name) {
            var listenerName = listener.name
            if (!this.listeners[listenerName]) {
                this.listeners[listenerName] = [];
            }
            this.listeners[listenerName].push(listener);
        }
    }

    notify(value, listenerName) {
        this.listeners[listenerName].forEach(listener => {
            listener.update(value, listenerName);
        })
    }
}
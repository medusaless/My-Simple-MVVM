import ListenerManager from './listenermanager'
import Listener from './listener'

export default class Observer {
    constructor({
        data
    } = {}) {
        this.data = data;
        this._listenerManager = new ListenerManager();
        this._initData(this.data);
    }

    _initData(data) {
        Object.keys(data).forEach(key => {
            this._defineReactive(data, key, data[key])
        });
    }

    getListenerManager() {
        return this._listenerManager;
    }

    _defineReactive(data, key, value) {
        let self = this;

        this._listenerManager.add(new Listener({
            name: key
        }));

        Object.defineProperty(data, key, {
            set: function (newValue) {
                value = newValue;
                self._listenerManager.notify(newValue, key);
            },
            get: function () {
                return value;
            }
        });
    }
}
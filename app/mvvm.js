import Observer from './observer'
import HTMLCompiler from './htmlcompiler'

export default class MVVM{
    constructor({ data, el } = { }){
       this.data = data;
       this._createDataProxy(data);
       this._mvvmObserver = new Observer({data});
       this._htmlCompiler = new HTMLCompiler(el, this, this._mvvmObserver.getListenerManager());
    }

    _createDataProxy(data){
       let self = this;
       Object.keys(data).forEach(key => {
           self._createDataKeyProxy(data, key, data[key])
       });
    }
    
    _createDataKeyProxy(data, key, value){
        Object.defineProperty(this, key, {
            get:function(){
                return data[key];
            },
            set:function(newValue){
                data[key] = newValue;
            }
        })
    }
}
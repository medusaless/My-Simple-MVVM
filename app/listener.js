export default class Listener {
    constructor({callback,name,context} = {}) {
       this.callback = callback;
       this.name = name;
       this.context = context;
    }

    update(newValue, name){
        if(this.callback){
            let funcContext = this.context || this;
            this.callback(newValue, name, funcContext);
        }
    }
}
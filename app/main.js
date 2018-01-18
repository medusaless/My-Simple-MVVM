import MyMVVM from './mvvm'

var app = new MyMVVM({
    el:'#app',
    data:{
        name:'abcd',
        age:12322
    }
});

document.getElementById('btn').onclick=function(){
   app.name = 'asdf';   
}


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
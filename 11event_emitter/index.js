const { clear } = require('console');
const EventEmitter = require('events');

class MyEventClass extends EventEmitter {}

const myEventClass = new MyEventClass();

myEventClass.on('comunicazione', (e) => {
  console.log(' comunicazione occurred:', e);
});

myEventClass.on('accendi', (e) => {
    console.log('accendi occurred:', e);
});

myEventClass.on('alza', (e) => {
    console.log('[GLOBAL] alza occurred:', e);
});

myEventClass.once('alza', (e) => {
    console.log('[GLOBAL] alza ONCE occurred:', e);
});

myEventClass.on('smetti_ascolto_tutte_callback_su', (e) =>{
    console.log('[GLOBAL] smetti_ascolto_tutte_callback_su occurred:', e);
    myEventClass.removeAllListeners(e.what);
});

// ---

let mystrangeobj = {
    x:10,
    event_manager: null,
    f: function(e){
        console.log('[mystrangeobj.f]  alza la saracinesca di ', e.h, 'cm');
        if(mystrangeobj.event_manager)
            mystrangeobj.event_manager.emit('comunicazione', {message:'mystrangeobj comunica a tutti che ho alzato la serranda alle '+Date.now()})
    },
    init: function(gestoreEventi){
        mystrangeobj.event_manager = gestoreEventi;
        mystrangeobj.event_manager.on('alza', mystrangeobj.f);
        mystrangeobj.event_manager.on('smetti_di_ascoltare', (data) => {
            if(data.what == 'alza'){
                console.log('[mystrangeobj.f] removeListener su alza');
                mystrangeobj.event_manager.removeListener('alza', mystrangeobj.f);
            }
        });
    }
};

mystrangeobj.init(myEventClass);

myEventClass.emit('alza', {h:125, why:'mattina'});

let emit_alza_every_2sec = setInterval(function(){
    myEventClass.emit('alza', {h:10});
}, 2000);

setTimeout(function(){
    myEventClass.emit('smetti_di_ascoltare', {what:'alza'});
},5000);

setTimeout(function(){
    myEventClass.emit('smetti_ascolto_tutte_callback_su', {what:'alza'});
    clearInterval(emit_alza_every_2sec);
},11000);

// funzioni utili
console.log('myEventClass.eventNames(): ',myEventClass.eventNames());
console.log('myEventClass.listenerCount("alza"): ',myEventClass.listenerCount("alza"));
console.log('myEventClass.listeners("alza"): ', myEventClass.listeners("alza"));
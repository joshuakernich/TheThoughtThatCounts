var SocketIO = function(){

  
  var key = '6df349d1b1c8f47e9f08b3a5cb391e8c';
  var channel = 2; // from 1 to 10,000,000 // need a new channel for every "sandbox" of comms
  var endpoint = `wss://socketsbay.com/wss/v2/${channel}/${key}/`;
  //endpoint = 'wss://ws.postman-echo.com/raw';
  var fnListener;

  console.log(endpoint);

  var s = new WebSocket(endpoint);
  s.onclose   = function(evt) { 
    console.log('socket is closed',evt);
  };
  s.onmessage = function(evt) {
    console.log('socket message',evt);
  };
  s.onerror   = function(evt) { 
    console.log('socket error',evt);
  };
  s.onopen    = function(evt) { 
    console.log('socket is open babyyyy',evt);
  };
  

  this.send = function(m){
    console.log('sending',m);
    s.send(m); 
  }

  this.activate = function(){
    //it's button time
    s.send('activate');
  }

  this.deactivate = function(){
    //it's not button time
    s.send('deactivate');
  }

  function onMessage(m){
    console.log('onMessage',m);
    fnListener(m);
  }

  this.setListener = function(fn){
    fnListener = fn;
  }
}
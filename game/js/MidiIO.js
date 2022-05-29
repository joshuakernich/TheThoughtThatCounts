var MidiIO = function(){

  var self = this;
  this.M = {
    

    INTRO:[176,0,0],
    STROLL_A:[176,0,1],
    STROLL_B:[176,0,2],
    STROLL_C:[176,0,3],

    INTERESTING:[176,1,0],
    CHOICE:[176,1,1],
    CHOICE_WONKY:[176,1,2],
    FEEDBACK:[176,1,3],

    DESCENT_A:[176,2,0],
    DESCENT_B:[176,2,1],
    DESCENT_C:[176,2,2],
    LIGHTNING:[176,2,3],
    CLIFF:[176,2,4],

    REDEMPTION_A:[176,3,0],
    REDEMPTION_B:[176,3,1],
    ANTICIPATION_A:[176,3,2],
    ANTICIPATION_B:[176,3,3],
    ANTICIPATION_C:[176,3,4],

    BUTTONS_ACTIVATE:[176,100,0],

    DAY_MODE:[176,101,0],
    NIGHT_MODE:[176,101,1],

    LIGHTNING_STRIKE_S:[176,102,0],
    LIGHTNING_STRIKE_M:[176,102,1],
    LIGHTNING_STRIKE_L:[176,102,2],
  }

  this.M.STROLLS = [this.M.STROLL_A,this.M.STROLL_B,this.M.STROLL_C];


  

  var output;


  this.receive = function(){

  }

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  function onMIDIFailure(midiAccess) {

  }

  function onMIDISuccess(midiAccess) {

    for (var output of midiAccess.outputs.values()){
      console.info('DISCOVERED OUTPUT',output.name);
      output.onstatechange = onMidiOutputState;
      output.open();  
    }

      for (var input of midiAccess.inputs.values()){
        console.info('DISCOVERED INPUT',input.name);
        input.onstatechange = onMidiInputState;
        input.onmidimessage = onMidiMessage;
        input.open();
      }
  }

  function onMidiInputState(e){
    if(e.target.connection == 'open'){
      console.info('INPUT CHANNEL OPEN',e.target.name);
    }
  }

  function onMidiOutputState(e){
    if(e.target.connection == 'open' && e.target.name == 'QLab'){
      console.info('OUTPUT CHANNEL OPEN',e.target.name);
      output = e.target;
      self.send(self.M.INTRO);
    }
  }

  this.send = function(message){
    if(output){
      console.log('SENT',message,'TO',output.name);
      output.send(message);
    }
  }

  function onMidiMessage(m){
    console.log('RECEIVED',m.data,'FROM',m.target.name);
    this.receive(m.data);
  }
}
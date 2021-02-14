
MIDI.send = toOutput;

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
		MIDI.send(MIDI.INTRO);
		MIDI.toCalm();
	}
}

function toOutput(message){
	console.log('SENT',message,'TO',output.name);
	output.send(message);
}

function onMidiMessage(m){
	console.log('RECEIVED',m.data,'FROM',m.target.name);
	MIDI.receive(m.data);
}
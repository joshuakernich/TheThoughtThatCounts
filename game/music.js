
MUSIC.to = doMusicCue;

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
function onMIDIFailure(midiAccess) {

}

function onMIDISuccess(midiAccess) {

	

	for (var output of midiAccess.outputs.values()){
		console.log(output);
		output.onstatechange = onMidiState;
		output.open();
		console.log(output);
		
	}

    for (var input of midiAccess.inputs.values()){
    	console.log(input);
    }
}

function onMidiState(e){
	if(e.target.connection == 'open'){
		console.log(e.target.name + ' is good to go');
		output = e.target;
		MUSIC.to(MUSIC.INTRO);
	}
}

function doMusicCue(message){
	output.send(message);
}
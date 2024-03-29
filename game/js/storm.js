var Storm = function(ioFX){

	const W_SHEET = 4096;
	const W = 475;
	const H = 257;
	const FRAMES = 91;

	var iTick;
	var $s = $('.storm');
	var offset = {'background-position-x':0,'background-position-y':0};
	var iTick = 0;
	var columns = Math.floor(W_SHEET/W);

	var lightning = [5,6,8,9,10,11,52,53,54,55,56,57,58];

	function tick(){
		iTick++;
		iTick = iTick%FRAMES;

		offset['background-position-x'] = -(iTick%columns)*100 + '%';
		offset['background-position-y'] = -Math.floor(iTick/columns)*100 + '%';
		$s.css(offset);

		if(iTick==3) ioFX.doLightning(1);
		if(iTick==6) ioFX.doLightning(2);
		if(iTick==51) ioFX.doLightning(3);
	}

	this.toStorm = function(){
		iTick = 0;
		tick();
		iTick = setInterval(tick,1000/12);
		$s.show();
	}

	this.toCalm = function(){
		clearInterval(iTick);
		$s.hide();
	}

};
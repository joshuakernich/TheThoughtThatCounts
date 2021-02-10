$(function(){

	const W_SHEET = 4096;
	const W = 475;
	const H = 257;
	const FRAMES = 91;

	var $s = $('.storm');
	var offset = {'background-position-x':0,'background-position-y':0};
	var iTick = 0;
	var columns = Math.floor(W_SHEET/W);

	var lightning = [5,6,8,9,10,11,52,53,54,55,56,57,58];

	setInterval(tick,1000/12);

	function tick(){
		iTick++;
		iTick = iTick%FRAMES;
		offset['background-position-x'] = -(iTick%columns)*W + 'px';
		offset['background-position-y'] = -Math.floor(iTick/columns)*H + 'px';
		$s.css(offset);

		if(lightning.indexOf(iTick+1)>-1) clapThatAss();
	}

	function clapThatAss(){
		
	}
})
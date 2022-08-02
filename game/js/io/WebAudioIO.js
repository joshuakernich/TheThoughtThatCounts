var WebAudioIO = function(audio){
  
  var self = this;

  var tracks = {
    INTRO:['00:16.385','00:23.890',true],
    STROLL_A:['00:05.656','00:23.911',true],
    STROLL_B:['00:45.839','01:03.499',true],
    STROLL_C:['01:14.294','01:33.456',true],

    INTERESTING:['02:45.452','02:54.547',true],
    CHOICE:['03:50.147','03:51.553',false],
    CHOICE_WONKY:['03:29.971','03:32.408',false],
    FEEDBACK:['02:45.452','02:54.547',true],

    DESCENT_A:['07:35.250','08:19.271',true],
    DESCENT_B:['08:22.995','09:07.556',true],
    DESCENT_C:['09:09.200','09:57.252',true],
    LIGHTNING:['10:04.187','10:46.333',true],
    CLIFF:['10:49.727','12:11.256',true],

    REDEMPTION_A:['12:13.710','13:09.831',true],
    REDEMPTION_B:['13:10.576','14:24.364',true],
    ANTICIPATION_A:['14:26.205','14:39.131',true],
    ANTICIPATION_B:['14:41.104','15:18.269',true],
    ANTICIPATION_C:['15:20.793','16:32.889',true],
  }



  function ms(stamp){
    var arr = stamp.split(/\.|:/);
    return parseInt(arr[0])*60*1000 + parseInt(arr[1])*1000 + parseInt(arr[2]);
  }

  var sprite = {};
  for(var n in tracks){
    var from = ms(tracks[n][0]);
    var to = ms(tracks[n][1]);
    var dur = to-from;
    var loop = tracks[n][2];
    sprite[n] = [from,dur,false];

    self[n] = n;
  }

  this.STROLLS = [this.STROLL_A,this.STROLL_B/*,this.STROLL_C*/];


  /*
    BUTTONS_ACTIVATE:[176,100,0],

    DAY_MODE:[176,101,0],
    NIGHT_MODE:[176,101,1],

    LIGHTNING_STRIKE_S:[176,102,0],
    LIGHTNING_STRIKE_M:[176,102,1],
    LIGHTNING_STRIKE_L:[176,102,2],
  }*/

  //console.log(audio.source);


  var sound = new Howl({
    src: [audio],
    format: ['mp3'],
    sprite: sprite,
    onend: onSoundEnd
  });

  var iMain; 

  function onSoundEnd(i){
    if(i==iMain){
      //main track has ended
      self.send('INTRO');
    }
  }

  this.send = function(t){

    var iNew = sound.play(t);

    if(tracks[t][2]){

      if(iMain != undefined) sound.fade(0.7,0,100,iMain);
      sound.volume(0.7,iNew);

      iMain = iNew;
    }
  }

  //sound.play();

}
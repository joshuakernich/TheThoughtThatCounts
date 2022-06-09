var WebAudioIO = function(audio){
  
  var self = this;
  var tracks = {
    INTRO:['00:16.385','00:23.890'],
    STROLL_A:['00:05.656','00:23.911'],
    STROLL_B:['00:45.839','01:03.499'],
    STROLL_C:['01:14.294','01:33.456'],

    INTERESTING:['18:35.674','18:49.300'],
    CHOICE:['03:50.147','03:51.553'],
    CHOICE_WONKY:['03:29.971','03:32.408'],
    FEEDBACK:['02:45.452','02:54.547'],

    DESCENT_A:['07:35.250','08:19.271'],
    DESCENT_B:['08:22.995','09:07.556'],
    DESCENT_C:['09:09.200','09:57.252'],
    LIGHTNING:['10:04.187','10:46.333'],
    CLIFF:['10:49.727','12:11.256'],

    REDEMPTION_A:['12:13.710','13:09.831'],
    REDEMPTION_B:['13:10.576','14:24.364'],
    ANTICIPATION_A:['14:26.205','14:39.131'],
    ANTICIPATION_B:['14:41.104','15:18.269'],
    ANTICIPATION_C:['15:20.793','16:32.889'],
  }

  function ms(stamp){
    var arr = stamp.split(/\.|:/);
    return parseInt(arr[0])*60*1000 + parseInt(arr[1])*1000 + parseInt(arr[2]);
  }

  var sprite = {};
  for(var n in tracks){
    var from = ms(tracks[n][0]);
    var to = ms(tracks[n][1]);
    var dur = from-to;
    sprite[n] = [from,dur];
  }


  /*
    BUTTONS_ACTIVATE:[176,100,0],

    DAY_MODE:[176,101,0],
    NIGHT_MODE:[176,101,1],

    LIGHTNING_STRIKE_S:[176,102,0],
    LIGHTNING_STRIKE_M:[176,102,1],
    LIGHTNING_STRIKE_L:[176,102,2],
  }*/

  console.log(audio.source);

  var sound = new Howl({
    src: ['./music/everything-and-more.mp3'],
    sprite: sprite
  });

  $(document).click(function(){
    console.log('lets go');
    sound.play('INTRO');
  });

  //sound.play();

}
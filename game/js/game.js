var Game = function(ioMusic, ioJoystick){
  var iThought = -1;

  var thoughts =[
    {
      transition:doIntroTranstion,
      q:[
        "Another beautiful day to be alive.",
        "Life sucks.",
        "I want Burrito."
      ],
      f:[
        {text:"That's a jolly good attitude."},
        {text:"You're not wrong, little fella."},
        {text:"Sadly. There is no Burrito."}
      ],
    },
    {
      transition:doRunTransition,
      transitionParams:{type:'pig'},
      intro:'A wild pig man approaches.',
      q:[
        "Looks like a friend in the making.",
        "I greatly fear this new unknown.",
        "I wonder if he has Burrito."
      ],
      f:[
        {text:"The wild pig man attacks!",action:battle},
        {text:"The wild pig man attacks!",action:battle},
        {text:"The wild pig man attacks!",action:battle}
      ],
    },
    {
      q:[
        "Probably mistaken identity.",
        {r:"Fuck this guy.",pg:"What a mean bloke."},
        "There is more to life than Burrito."
      ],
      f:[
        {text:"The wild pig man apologizes for his actions."},
        {text:"The wild pig man attacks again!",action:battle},
        {text:"A valuable insight."}
      ],
    },
    {
      q:[
        "I tire of wild pig man.",
        "Wild pig man probably suffers from unresolved childhood trauma.",
        "I leave this place with a new friend."
      ],
      f:[
        {text:"Let's carry on."},
        {text:"Wisdom beyond your years."},
        {text:"Always nice to make a new friend."}
      ],
    },
    {
      transition:doRunTransition, 
      transitionParams:{},
      q:[
        "It's nice to have a moment to myself.",
        "I'm lonely out here in the wild.",
        "I miss the wild pig man."
      ],
      f:[
        {text:"Stay as long as you like."},
        {text:"Perhaps you shouldn't have abandoned wild pig man so quickly."},
        {text:"I miss him too."}
      ],
    },
    {
      transition:doRunTransition, 
      transitionParams:{type:'strawb'},
      intro:{r:'Holy shit! A tasty Strawb!',pg:'Golly gosh! A tasty Strawb!'},
      q:[
        {r:"Fuck, I love Strawbs!",pg:'I do love my Strawbs!'},
        "Plants are animal food, not man food!",
        "A gift from the Gods!"
      ],
      f:[
        {text:"You ate Strawb!",action:eat},
        {text:{r:"Yeah! Fuck that Strawb.",pg:"Yeah! Forget that Strawb."}},
        {text:"God giveth. God taketh away.",action:flyAway}
      ],
    },
    {
      transition:doRunTransition, 
      transitionParams:{type:'pig'},
      intro:'Wild pig man has returned.',
      q:[
        {r:"Fuck, not this guy again!",pg:"Not this guy again!"},
        "I wish he'd go away.",
        "Mr Pig Man! My old friend!"
      ],
      f:[
        {text:"Let's ignore him."},
        {text:"Let's ignore him."},
        {text:"You exchange an approving nod."}
      ],
    },
    {
      transition:doRunTransition, 
      transitionParams:{type:'bunny'},
      intro:'Looks like Professor Bunnykins from Bunnsville.',
      q:[
        "This is why we need a rabbit-proof fence.",
        "I owe all of God's creatures my respect.",
        "Yum. Bunny for dinner."
      ],
      f:[
        {text:"Professor Bunnykins is unphased by your disdain."},
        {text:"God giveth. God taketh away.",action:flyAway},
        {text:"You ate Professor Bunnykins! He was delicious.",action:eat}
      ],
    },
    {
      transition:doRunTransition, 
      transitionParams:{type:'bunny'},
      trackIntro:ioMusic.M.INTERESTING,
      intro:'Wait! what?',
      q:[
        "Must be a glitch in the Matrix.",
        "Life doesn't often give us second chances.",
        "Perhaps I should rethink my approach."
      ],
      f:[
        {text:"A glitch? Or an opportunity?"},
        {text:"A second chance? Or an opportunity?"},
        {text:"Tread carefully. You may not come by this place again."}
      ],
    },
    {
      intro:'Looks like Professor Bunnykins from Bunnsville.',
      q:[
        "This is why we need a rabbit-proof fence.",
        "I owe all of God's creatures my respect.",
        "Yum. Bunny for dinner."
      ],
      f:[
        {text:"Professor Bunnykins is unphased by your disdain."},
        {text:"God giveth. God taketh away.",action:flyAway},
        {text:"You ate Professor Bunnykins! He was delicious.",action:eat}
      ],
    },
    {
      transition:doRunTransition, 
      transitionParams:{type:'bunny'},
      intro:"Third time's a charm.",
      q:[
        "Friendship may be a worthy option, here.",
        "I'm beggining to appreciate Professor Bunnykins.",
        "Wait. These options are different."
      ],
      f:[
        {text:"Professor Bunnykins appreciates your affection."},
        {text:"Professor Bunnykins appreciates your affection."},
        {text:"You're on to me."}
      ],
    },
    {
      q:[
        "Perhaps this friendship could be sealed with a kiss.",
        "I should ask for consent before I touch him.",
        {r:"I've never fucked a rabbit before.",pg:"I've never cuddled a rabbit before."}
      ],
      f:[
        {text:"Professor Bunnykins ran away.",action:runAway},
        {text:"Professor Bunnykins affirms his boundaries."},
        {text:"Professor Bunnykins ran away.",action:runAway}
      ],
    },{
      transition:doRunTransition, 
      transitionParams:{},
      q:[
        "I think I did well with Professor Bunnykins.",
        "I'm feeling akward in these social situations.",
        "I could sure eat another Strawb."
      ],
      f:[
        {text:"This was never a test."},
        {text:"And that's welcome, too."},
        {text:"You and me both."}
      ],
    },{
      transition:doRunTransition, 
      transitionParams:{type:'strawb'},
      q:[
        "Ah yes. Delish.",
        "I don't deserve this.",
        "Where are these Strawbs coming from?"
      ],
      f:[
        {text:"You ate Strawb",action:eat},
        {text:"It was a gift."},
        {text:"That's a good question."}
      ],
    },
    {
      isWonky:true,
      transition:doRunTransition, 
      transitionParams:{type:'pig'},
      q:[
        "I don't really have the energy for wild pig man.",
        "I wish I could find some space out here.",
        "Mister pig man doesn't really care about me."
      ],
      f:[
        {text:"Let's carry on."},
        {text:"Let's ignore him."},
        {text:"You're probably right."}
      ],
    },
    {
      isWonky:true,
      transition:doRunTransition, 
      transitionParams:{type:'log'},
      intro:"If it isn't old man, Mister Loggington",
      q:[
        "I don't have space in my life for a new friend right now.",
        "I wish I could find some space out here.",
        "This is making me anxious."
      ],
      f:[
        {text:"Let's carry on."},
        {text:"Let's carry on."},
        {text:"Let's carry on."}
      ],
    },
    {
      isWonky:true,
      transition:doRunTransition, 
      transitionParams:{type:''},
      q:[
        "I'm very much alone out here.",
        "This is exhausting.",
        "I wish I could shake this anxiety."
      ],
      f:[
        {text:"Let's carry on."},
        {text:"Let's carry on."},
        {text:"Let's carry on."}
      ],
    },
    {
      isWonky:true,
      transition:doRunForever,
      q:[
        "This is a path I have to walk alone.",
        "It's been a long time since there was a Strawb.",
        "If Professor Bunnington really cared, he'd call me."
      ],
      f:[
        {text:"Some challenges are best faced alone."},
        {text:"Used to be a lot of Strawbs around here."},
        {text:"You're damn right."}
      ],
    },
    {
      isWonky:true,
      track:ioMusic.M.DESCENT_A,
      q:[
        "I am very much alone.",
        "There are no more Strawbs for me.",
        "This anxiety is killing me."
      ],
      f:[
        {text:"A good opportunity to take some space."},
        {text:"Yeah. I think that party is over."},
        {text:"You should look within."}
      ],
    },
    {
      isWonky:true,
      track:ioMusic.M.DESCENT_B,
      q:[
        "I am alone.",
        "It's hopeless.",
        "I can't do this any more."
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {
      isWonky:true,
      q:[
        "It's hopeless.",
        "I can't do this any more.",
        "Nothing is going my way."
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {
      isWonky:true,
      transition:doThunderTransition,
      q:[
        "I can't do this any more.",
        "I can't do this any more.",
        "I can't do this any more."
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {
      track:ioMusic.M.CLIFF,
      isWonky:true,
      q:[
        "There is no way out.",
        "There is no way out.",
        "There is no way out."
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {
      isWonky:true,
      transition:doCliffTransition,
      q:[
        "I am going to end it.",
        "I am going to end it.",
        "I am going to end it.",
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {
      
      transition:doPigFinale,
      intro:`"Dont't do it."`,
      q:[
        "Why shouldn't I?",
        "Why shouldn't I?",
        "Why shouldn't I?"
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {
      trackIntro:ioMusic.M.REDEMPTION_A,
      transition:doBunnyFinale,
      intro:`"Because you are loved."`,
      q:[
        "But I am alone.",
        "But I am alone.",
        "But I am alone.",
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {
      
      transition:doLogFinale,
      //intro:`"You're not alone."`,
      q:[
        "But you won't be always be here.",
        "But the world is a lonely place.",
        "But you weren't here when I needed you.",
      ],
      f:[
        {},
        {},
        {}
      ]
    },
    {
      
      transition:doStrawbs,
      q:[
        "I do like Strawbs.",
        "That's very thoughtful.",
        "Maybe just one.",
      ],
      f:[
        {},
        {},
        {}
      ],
    },
    {

      transition:doWin,
      q:[
        
      ],
      f:[
        {},
        {},
        {}
      ],
    }
  ]

  var storm = new Storm();


  function doNextThought(){
    

    if(thoughts[iThought].intro) doThoughtIntro();
    else doThoughtBubble();
  }

  function makePG(s){
    if(isPG && s.pg) return s.pg;
    else if(s.r) return s.r;
    else return s;
  }

  function doThoughtIntro(){
    $('.message').html(makePG(thoughts[iThought].intro)).animate({opacity:1},500).delay(1500).animate({opacity:0},500);

    
    if(thoughts[iThought].trackIntro) ioMusic.send(thoughts[iThought].trackIntro);

    setTimeout(doThoughtBubble,2500);
  }


  var timeAtThought = 0;
  var iThoughtTimer = 0;
  var MAX_TIME_PER_THOUGHT = 20;
  var secondsWas = MAX_TIME_PER_THOUGHT;

  function doThoughtBubble(){

    $('.timer').hide();

    console.log('doThoughtBubble',iThought,thoughts[iThought].track)
    if(thoughts[iThought].track) ioMusic.send(thoughts[iThought].track);

    $('.question-options').empty();
    $('.question').animate({opacity:1});

    var thought = thoughts[iThought];

    for(var i=0; i<thought.q.length; i++){
      $('<button>').appendTo($('.question-options')).html(makePG(thought.q[i])).click(onThoughtSelect);
    } 

    secondsWas = MAX_TIME_PER_THOUGHT;
    timeAtThought = new Date().getTime();
    iThoughtTimer = setInterval(tickThoughtTimer,100);

    setTimeout(activateButtons,1000);
  }

  function tickThoughtTimer(){
    var timeNow = new Date().getTime();
    var elapsed = timeNow - timeAtThought;
    var remaining = MAX_TIME_PER_THOUGHT*1000-elapsed;
    var secondsNow = Math.ceil( remaining/1000 );

    if(secondsNow<secondsWas && secondsNow<=10){
      $('.timer').html(secondsNow).addClass('bloat').show();
      setTimeout(function(){
        $('.timer').removeClass('bloat');
      },100)
    }

    secondsWas = secondsNow;

    if(remaining < -500) $('.question-options button').eq( Math.floor(Math.random()*3) ).trigger('click');
  }

  function onThoughtSelect(){

    clearInterval(iThoughtTimer);
    $('.timer').hide();

    $('.question button').addClass('dead');
    $(this).addClass('selected').removeClass('dead');

    var index = $('.question button').index(this);

    ioMusic.send(thoughts[iThought].isWonky?ioMusic.M.CHOICE_WONKY:ioMusic.M.CHOICE);

    $('.question').delay(1700).animate({opacity:0});
    if(thoughts[iThought].f[index].text){
      $('.feedback').html(makePG(thoughts[iThought].f[index].text)).css({top:'100vh'}).delay(2000).animate({top:'50vh'}).animate({top:'45vh'},3000).animate({top:'-150px'});

      setTimeout(function(){ ioMusic.send(ioMusic.M.FEEDBACK); },2000);
    }

    if( thoughts[iThought].f[index].action ){
      setTimeout( thoughts[iThought].f[index].action, 500 );
    } 

    var delay = 3500;
    if(thoughts[iThought].f[index].text) delay = 6500;

    setTimeout( finishThought, delay );
    
  } 

  function finishThought(){
    iThought++;
    if( thoughts[iThought].transition ) thoughts[iThought].transition.call();
    else doNextThought();
  }


  // TRANSITIONS
  var iRun = 0;
  function doRunTransition(){

    setTimeout(function(){ ioMusic.send(ioMusic.M.STROLLS[(iRun%ioMusic.M.STROLLS.length)]); },800);

    var $old = $('.enemy');

    if(thoughts[iThought].transitionParams.type){
      var $new = $('<div class="sprite enemy">').appendTo('.game').addClass(thoughts[iThought].transitionParams.type);
      $new.animate({left:'50vw'},4000,'linear'); 

    }

    iRun++;
    var offset = -iRun*50;

    $('.character').appendTo('.game').addClass('run').animate({left:'40vw'},4000,'linear',onTransitionComplete); 
    $('.ground-surface').animate({'background-position-x':(''+offset+'vw')},4000,'linear'); 

    if($old) $old.animate({left:'-50px'},4000,'linear',function(){
      $old.remove();
    });     
  }

  function doRunForever(){
    ioMusic.send(ioMusic.M.STROLL_C);
    var cycles = 100;
    iRun += 100;
    var offset = -iRun*50;

    $('.character').addClass('run');
    $('.ground-surface').animate({'background-position-x':(''+offset+'vw')},4000*cycles,'linear'); 

    setTimeout(doNextThought,4000);
  }

  function doCliffTransition(){
    $('.ground-surface').stop();
    $('.game').animate({bottom:'150px'},4000,'linear');
    $('.ground').animate({left:'-55vw'},4000,'linear',function(){
      $('.character').removeClass('run');
      
      setTimeout(doNextThought,1000);
    });
  }

  function flashMessage(text){
    $('.message').html(makePG(text)).stop().css({opacity:1}).delay(1250).animate({opacity:0},500);
  }

  function doPigFinale(){
    $('.character').addClass('run').animate({left:'45vw'},1000,function(){
      $('.character').removeClass('run');
    });

    function doWait(){
      ioMusic.send(ioMusic.M.REDEMPTION_B);
      flashMessage(`"Wait..."`);
    }

    function doMisterPig(){
      $('<div class="sprite enemy pig run">').appendTo('.game').css({transform:'scaleX(-1)',left:'-100px'}).animate({left:'20vw'},1000,'linear', function(){
        $(this).removeClass('run');
      });
    }

    setTimeout(doWait,1000);
    setTimeout(doMisterPig,2000);
    setTimeout(doNextThought,4000);
  }

  function doBunnyFinale(){
    $('<div class="sprite enemy bunny run">').appendTo('.game').css({transform:'scaleX(-1)',left:'-100px'}).animate({left:'15vw'},1000,'linear', function(){
      $(this).removeClass('run');
    });
    setTimeout(doNextThought,2000);
  }

  function doLogFinale(){
    $('<div class="sprite enemy log run">').appendTo('.game').css({transform:'scaleX(-1)',left:'-100px'}).animate({left:'8vw'},1000,'linear', function(){
      $(this).removeClass('run'); 
    });

    setTimeout(function(){
      flashMessage(`"You're not alone."`);
      ioMusic.send(ioMusic.M.ANTICIPATION_A);
    },2000);

    setTimeout(function(){
      flashMessage(`"We are here."`);
    },4000);

    setTimeout(function(){
      $('.character').css({transform:'scaleX(-1)'}).animate({left:'43vw'},200);
    },5000);

    

    setTimeout(doThoughtBubble,6000);
  }

  function doStrawbs(){

    setTimeout(function(){
      $('.pig').addClass('run').animate({left:'25vw'},1000,function(){
        $(this).removeClass('run');
      });
    },100);

    setTimeout(function(){
      $('.bunny').addClass('run').animate({left:'18vw'},1000,function(){
        $(this).removeClass('run');
      });
    },250);

    setTimeout(function(){
      $('.log').addClass('run').animate({left:'10vw'},1000,function(){
        $(this).removeClass('run');
      });
    },500);


    setTimeout(function(){
      ioMusic.send(ioMusic.M.REDEMPTION_A);
      flashMessage(`"You're right."`);
    },1000);

    setTimeout(function(){
      flashMessage(`"But we are here now."`);
    },4000);

    setTimeout(function(){
      flashMessage(`"And wherever we go..."`);
    },7000);

    setTimeout(function(){
      
      flashMessage(`"You will always be loved."`);
    },10000);

    setTimeout(function(){
      ioMusic.send(ioMusic.M.ANTICIPATION_C);
      flashMessage(`"Also..."`);
    },15000);

    setTimeout(function(){
      ioMusic.send(ioMusic.M.REDEMPTION_A);
      flashMessage(`"We have Strawbs."`);
      
    },18000);

    setTimeout(doThoughtBubble,21000);
  }

  function doWin(){
    ioMusic.send(ioMusic.M.STROLL_B);
    ioMusic.send(ioMusic.M.DAY_MODE);
    storm.toCalm();

    setTimeout(function(){
      $('.enemy').each(function(){
      $('<div class="sprite enemy strawb">').appendTo('.game').css({left:$(this).css('left')}).animate({top:-150});
      })
    },500);

    setTimeout(function(){
      $('.character').addClass('run').animate({left:'35vw'},1000,function(){
        $('.character').removeClass('run');
      })
    },1000);

    setTimeout(function(){
      $('.strawb').each(function(){
        $(this).animate({left:'35vw',top:'-50px'},1000,function(){
          $(this).remove();
        })
      })
    },2500);

    setTimeout(function(){
      $('.character').addClass('run').animate({left:'-100px'},4000);
    },4500);

    setTimeout(function(){
      $('.log').css({transform:'scaleX(1)'}).addClass('run').animate({left:'-100px'},3000);
    },6500);

    setTimeout(function(){
      $('.bunny').css({transform:'scaleX(1)'}).addClass('run').animate({left:'-100px'},2000);
    },7000);

    setTimeout(function(){
      $('.pig').css({transform:'scaleX(1)'}).addClass('run').animate({left:'-100px'},2000);
    },7500);

    setTimeout(function(){

      setTimeout(function(){
        ioMusic.send(ioMusic.M.STROLL_A);
      },1500)
      $('.finale').animate({opacity:1},2000).delay(1500).animate({top:-$('.finale').height()+$(window).innerHeight()},30000,'linear');
    },10000);
  }

  function doThunderTransition(){
    ioMusic.send(ioMusic.M.LIGHTNING);
    ioMusic.send(ioMusic.NIGHT_MODE);
    storm.toStorm();
    //$('.bg').addClass('thunder');
    setTimeout(doNextThought,4000);
  }

  function doIntroTranstion(){
    ioMusic.send(ioMusic.M.STROLL_A);
    $('.character').addClass('run').animate({left:'40vw'},4000,'linear',onTransitionComplete); 
  }

  function onTransitionComplete(){
    $('.character').removeClass('run');
    doNextThought();
  }

  // ACTIONS
  function flyAway(){

    $('<div class="beam">').appendTo('.game').css({left:$('.enemy').css('left')})
    .css({opacity:0}).animate({opacity:1},200).delay(600).animate({opacity:0});

    $('.enemy').animate({top:'-100vh'},1000,function(){
      $('.enemy').remove();
      $('.beam').remove();
    });
  }

  function runAway(){
    $('.enemy').css({transform:'scaleX(-1)'}).addClass('run').animate({left:'100vw'},2000,function(){
      $('.enemy').remove();
    });
  }

  function eat(){
    $('.character').delay(500).animate({left:'50vw'},100,function(){
      $('.enemy').remove();
    }).delay(500).animate({left:'40vw'},100);
  }

  function battle(){
    $('.enemy').delay(500).animate({left:'40vw'},100,ouch).delay(500).animate({left:'50vw'},100);
  }

  function ouch(){
    $('.character').addClass('ouch').animate({left:'38vw'},200).delay(500).animate({left:'40vw'},300,idle);
  }

  function idle(){
    $('.character').removeClass('ouch run');
  }

  var whereWeAt = 'menu';

  var isPG = false;
  $('.menu button').click(function(){

    whereWeAt = 'nowhere';

    ioJoystick.deactivate();

    var index = $('.menu button').index(this);
    if(index==2) isPG = true;

    $('.menu button').addClass('selected');
    $('.intro').show().css({bottom:-500}).delay(800).animate({bottom:200},1000);
    $('.menu').delay(800).animate({bottom:'130vh'},1000,function(){
      $('.menu').hide();

      whereWeAt = 'start'
    });
  });

  $('.intro button').click(function(){

    whereWeAt = 'nowhere'

    ioJoystick.deactivate();

    $('.intro button').addClass('selected');
    $('.intro').delay(800).animate({bottom:'100vh'},1000,function(){
      $('.intro').hide();
      finishThought();

      whereWeAt = 'game'
    });
  });

  function activateButtons(){
    ioJoystick.activate();
  }

  ioJoystick.receive = function(d){

    if(whereWeAt == 'menu'){
      if(d[2] != 1) $('.menu button').eq(d[2]).click();
    } else if (whereWeAt == 'start'){
      $('.intro button').click();
    } else if (whereWeAt == 'game'){
      $('.question button').eq(d[2]).click();
    }

    
  }
}
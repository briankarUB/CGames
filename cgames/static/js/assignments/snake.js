var s = 0;
var t;
var timer_is_on = 0;
var end_time = 0;

function timedCount() {
  document.getElementById("timerDisplay").innerText = s.toString();
  s = s + 1;
  t = setTimeout(function() {
    timedCount()
  }, 1000);
}

function startCount() {
  if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  end_time = s - 1; //when users is done with quiz time will stop
  timer_is_on = 0;
}



// question1 loop
var ans = [];
var a = 0;
while(a < 20){
  ans.push(a);
  console.log(a);
  a = a + 2;
}

var ans1 = [];
for (var n = 7; n > 0; n--) {
  for (var m = 0; m < 6; m++) {
    var x = n * 2 + m * 3;
    ans1.push(x);
    console.log(x);
  }
}

var ans2 = [];
for (var n = 1; n < 20; n = n - 4){
  for (var i = 0; i < 13; i++) {
      var x = (n + n)+3
      var x1 = x - i;
      ans2.push(x1);
  }
  n = n + 6;
}

// test cases
// var ans = [1];
// var ans1 = [2];
// var ans2 = [3];

var qNum = 0;
function next() {
  makeBoard();
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("c").scrollIntoView({ block: 'end', behavior: 'smooth'});
  document.getElementById("c").style.display = "block";
  document.getElementById("moveON").style.display = "none";

  if (qNum === 0){
    document.getElementById("q1").style.display = "none";
    document.getElementById("q2").style.display = "block";
    ans = ans1;
    num = ans[0];
    num1 = ans[0] + 2;
    num2 = ans[0] + 1;
    index = 1;
  }else{
    document.getElementById("q2").style.display = "none";
    document.getElementById("q3").style.display = "block";
    ans = ans2;
    num = ans[0];
    num1 = ans[0] + 2;
    num2 = ans[0] + 1;
    index = 1;
  }
  qNum++;
}

function makeBoard() {
  SIZE = 500; // Size of the play-field in pixels
  GRID_SIZE = SIZE / 50;
  c = document.getElementById('c');
  c.height = c.width = SIZE * 2; // 2x our resolution so retina screens look good
  c.style.width = c.style.height = SIZE + 'px';
  context = c.getContext('2d');
  context.scale(2, 2); // Scale our canvas for retina screens

  direction = newDirection = 1; // -2: up, 2: down, -1: left, 1: right
  snakeLength = 5;
  snake = [{
    x: SIZE / 2,
    y: SIZE / 2
  }]; // Snake starts in the center
  candy = null;
  candy1 = null;
  candy2 = null;
  end = false;

  num = ans[0];
  num1 = ans[0] + 2;
  num2 = ans[0] + 1;
  index = 1;
}

function randomNum(x) {

  var list0 = [x + 1, x + 2];
  var list1 = [x - 1, x + 1];
  var list2 = [x - 2, x - 1];
  var list = [list0, list1, list2];

  var randomNum = Math.floor(Math.random() * list.length);
  return list[randomNum]

}

function randomOffset() {
  return Math.floor(Math.random() * SIZE / GRID_SIZE) * GRID_SIZE;
}

function stringifyCoord(obj) {
  return [obj.x, obj.y].join(',');
}

function tick() {
  var newHead = {x: snake[0].x, y: snake[0].y};

  // Only change directon if the new direction is a different axis
  if (Math.abs(direction) !== Math.abs(newDirection)) {
    direction = newDirection;
  }
  var axis = Math.abs(direction) === 1 ? 'x' : 'y'; // 1, -1 are X; 2, -2 are Y
  if (direction < 0) {
    newHead[axis] -= GRID_SIZE; // Move left or down
  } else {
    newHead[axis] += GRID_SIZE; // Move right or up
  }

  // Did we eat a candy? Detect if our head is in the same cell as the candy
  if (candy && candy.x === newHead.x && candy.y === newHead.y) {
    candy = null;
    candy1 = null;
    candy2 = null;
    num = ans[index];
    var list = randomNum(ans[index]);
    num1 = list[0];
    num2 = list[1];
    index++;
    snakeLength += 5;
  }

  context.fillStyle = '#002b36';
  context.fillRect(0, 0, SIZE, SIZE); // Reset the play area
  if (end) {
    context.fillStyle = '#eee8d5';
    context.font = '20px serif';
    context.textAlign = 'center';
    context.fillText('GAME OVER! The correct print was ' + num, SIZE / 2, SIZE / 2);
    document.getElementById("resetButton").style.display = "inline-block";
  } else if ((index > ans.length) && (qNum === 2)){ //when players finishs all the questions
    stopCount();
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("c").style.display = "none";

    document.getElementById("score").innerHTML = "WOW You finished them all! Your time was " + end_time + "s";

    document.getElementById("compare").innerHTML = "Compare how you stack up against other users: "
    + '<a href="../leaderboard">Leaderboard</a>';

    var name = prompt('You finished them all! What is your name?');
    //this calculation sets the score from the timer with under 30 seconds being a 100%
    var score = Math.floor(-(1/2)*end_time +1000)
    if (score>100) {
      score = 100

    }
    $.post('../submit_score', {
        'name': name,
        'quiz': 2,
        'score': score
        // this multiplier is Incomplete
    });
  } else if (index > ans.length) {
    document.getElementById("c").style.display = "none";
    document.getElementById("moveON").style.display = "block";

    document.getElementById("nextButton").style.display = "block";

    // turn all the candy to 0 when users gets to end of Array


  }
  else {
    snake.unshift(newHead); // Add the new head to the front
    snake = snake.slice(0, snakeLength); // Enforce the snake's max length
  }

  // Detect wall collisions
  if (newHead.x < 0 || newHead.x >= SIZE || newHead.y < 0 || newHead.y >= SIZE) {
    end = true;
  }

  context.fillStyle = 'green';
  var snakeObj = {};
  for (var i = 0; i < snake.length; i++) {
    var a = snake[i];
    context.fillRect(a.x, a.y, GRID_SIZE, GRID_SIZE); // Paint the snake
    // Build a collision lookup object
    if (i > 0) snakeObj[stringifyCoord(a)] = true;
  }

  if (snakeObj[stringifyCoord(newHead)]) end = true; // Collided with our tail


  // Place a candy (not on the snake) if needed
  while (!candy || snakeObj[stringifyCoord(candy)] || snakeObj[stringifyCoord(candy1)] || snakeObj[stringifyCoord(candy2)] ) {
    candy = {
      x: randomOffset(),
      y: randomOffset()
    };
    candy1 = {
      x: randomOffset(),
      y: randomOffset()
    };
    if (candy1.x === candy.x && candy1.y === candy.y) {
      candy1 = {
        x: randomOffset(),
        y: randomOffset()
      };
    }
    candy2 = {
      x: randomOffset(),
      y: randomOffset()
    };
    if ((candy2.x === candy.x && candy2.y === candy.y) || (candy2.x === candy1.x && candy2.y === candy1.y)) {
      candy2 = {
        x: randomOffset(),
        y: randomOffset()
      };
    }
  }

  if ( (newHead.x == candy1.x && newHead.y == candy1.y) || (newHead.x == candy2.x && newHead.y == candy2.y) ) end = true;


  // context.fillStyle = '#b58900';
  context.fillStyle = 'white';
  context.font = '12px serif';
  context.fillText(num, candy.x, candy.y + 9); // Paint the candy

  context.fillText(num1, candy1.x, candy1.y + 9); // Paint the candy
  context.fillText(num2, candy2.x, candy2.y + 9); // Paint the candy


}

showDiv = function() {
  startCount();

  document.getElementById("q1").style.display = "block";

  document.getElementById("startButton").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  makeBoard();
  document.getElementById("c").scrollIntoView({ block: 'end', behavior: 'smooth'});

  setInterval(tick, 100); // Kick off the game loop!
  window.onkeydown = function(e) {
    //prevent scrolling of the page with the keys pressed
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    //log keys being pressed
    newDirection = {
      37: -1,
      38: -2,
      39: 1,
      40: 2
    }[e.keyCode] || newDirection;
  };
};



function reset() {
  makeBoard();
  document.getElementById("resetButton").style.display = "none";
  window.onkeydown = function(e) {
    //prevent scrolling of the page with the keys pressed
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    //log keys being pressed
    newDirection = {
      37: -1,
      38: -2,
      39: 1,
      40: 2
    }[e.keyCode] || newDirection;
  };
  s = 0;

}

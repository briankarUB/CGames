var c = 0;
var t;
var timer_is_on = 0;
var end_time = 0;

function timedCount() {
  document.getElementById("timerDisplay").innerText = c.toString();
  c = c + 1;
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
  end_time = c - 1; //when users is done with quiz time will stop
  timer_is_on = 0;
}

function showDiv() {
  document.getElementById('gameContainer').style.display = "block";

  document.getElementById('startButton').style.display = "none";
  startCount();
  choosePic();
}


var qfolder = ["q1", "q2", "q3", "q4", "q5", "q6"];

var qCount = 0; // count of current question
var html; // html to save the current state of the game
html = document.getElementById('gameContainer').innerHTML;

// pick a ramdom img for vehicles
function choosePic() {

  if (qCount < 6){
  document.getElementById("question" + qCount).style.display = "block";
  }

  //Print the question you're on
  document.getElementById("questionNumber").innerHTML = "Train " + (qCount + 1) + " out of 6";

  //go through different question by folder when ever user clicks next
  var folderName = qfolder[qCount];
  var myPix = new Array("../static/img/" + folderName + "/1.jpg", "../static/img/" + folderName + "/2.jpg", "../static/img/" + folderName + "/3.jpg", "../static/img/" + folderName + "/4.jpg");


  var randomNum = Math.floor(Math.random() * myPix.length); // find radom index from image arr
  document.getElementById("train").src = myPix[randomNum];
  myPix.splice(randomNum, 1); // remove the image from arr after it has been picked

  randomNum = Math.floor(Math.random() * myPix.length);
  document.getElementById("train1").src = myPix[randomNum];
  myPix.splice(randomNum, 1);

  randomNum = Math.floor(Math.random() * myPix.length);
  document.getElementById("train2").src = myPix[randomNum];
  myPix.splice(randomNum, 1);

  randomNum = Math.floor(Math.random() * myPix.length);
  document.getElementById("train3").src = myPix[randomNum];

  qCount++; //increment count to go to the next question

  addListener();

}

//reset the current question when the reset button is clicked
function reset() {
  var container = document.getElementById("gameContainer"); //get the current state of the gameContainer
  container.innerHTML = html; //reset the current gameContainer to the old gameContainer
  qCount--; //decrement quesiton counter to ensure you reset the same question
  choosePic();
}

function next() {

  if (dropZone1.hasChildNodes() && dropZone2.hasChildNodes() && dropZone3.hasChildNodes() && dropZone4.hasChildNodes()) {
    if (dropZone1.childNodes[0].src.includes("1.jpg") &&
      dropZone2.childNodes[0].src.includes("2.jpg") &&
      dropZone3.childNodes[0].src.includes("3.jpg") &&
      dropZone4.childNodes[0].src.includes("4.jpg")) {

      if (qCount < qfolder.length) {
        // remove the red border of dropZones
        dropZone1.style.border = "none";
        dropZone2.style.border = "none";
        dropZone3.style.border = "none";
        dropZone4.style.border = "none";

        //remove nextButton untill the train is gone
        document.getElementById("nextButton").style.display = "none";

        //move the train frame my frame untill it is out of screen before moving on to next question
        var elem = document.getElementById("move");
        var pos = 0;
        var id = setInterval(frame, 10);
        function frame() {
          if (pos < 150) {
            pos = pos + 2;
            elem.style.right = pos + '%';
          } else {
            clearInterval(id);
            var container = document.getElementById("gameContainer"); //get the current state of the gameContainer
            container.innerHTML = html; //reset the current gameContainer to the old gameContainer
            choosePic(); // choose pictures for the next question
          }
        }

      } else {
        stopCount();
        document.getElementById("nextButton").style.display = "none"; // turn next button unclickable
        document.getElementById("resetButton").style.display = "none";
        document.getElementById("score").innerHTML = "You time was " + end_time + "s";
        document.getElementById("compare").innerHTML = "Compare how you stack up against other users: "
        + '<a href="../leaderboard">Leaderboard</a>';

        var name = prompt('What is your name?');
        //this calculation sets the score from the timer with under 30 seconds being a 100%
        var timelimit = 300
        var score = Math.floor(timelimit /end_time)*10
        if (score>100) {
          score = 100

        }
        $.post('../submit_score', {
            'name': name,
            'quiz': 2,
            'score': score
            // this multiplier is Incomplete
        });
      }
    } else {
      alert("Incorrect Order! Try again to move on");
      reset();
    }

  } else {
    alert("Incomplete train! Get the correct order to move on");
    reset();
  }

}


let dragged;

function onDragOver(event) {
  // Prevent default to allow drop
  event.preventDefault();
}

function onDragLeave(event) {
  event.target.style.background = '';
}

function onDragEnter(event) {
  const target = event.target;
  if (target && dragged) {
    event.preventDefault();
    // Set the dropEffect to move
    event.dataTransfer.dropEffect = 'move';
    target.style.background = '#1f904e';
  }
}

function onDrop(event) {
  const target = event.target;
  // make sure you can only drop on target and not another img
  if (target && dragged && target.nodeName !== 'IMG' && target.hasChildNodes() === false) {
    target.style.backgroundColor = '';
    event.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    // dragged.parentNode.removeChild(dragged);
    dragged.style.opacity = '';
    try {
      target.appendChild(dragged);
    } catch (err) {
      alert("Space already taken!");
    }
  }
}

function onDragStart(event) {
  let target = event.target;
  if (target && target.nodeName === 'IMG') { // If target is an image
    dragged = target;
    event.dataTransfer.setData('text', target.id);
    event.dataTransfer.dropEffect = 'move';
    // Make it half transparent
    event.target.style.opacity = .3;
  }
}

function onDragEnd(event) {
  if (event.target && event.target.nodeName === 'IMG') {
    // Reset the transparency
    event.target.style.opacity = ''; // reset opacity when drag ends
    dragged = null;
  }
}

function addListener() {
  cart = document.querySelector('.carts');
  dropZone1 = document.querySelector('.drop-zone1');

  // Adding event listeners (making them draggable) to the pics and drop-boxs
  cart.addEventListener('dragstart', onDragStart);
  cart.addEventListener('dragend', onDragEnd);
  dropZone1.addEventListener('drop', onDrop);
  dropZone1.addEventListener('dragenter', onDragEnter);
  dropZone1.addEventListener('dragleave', onDragLeave);
  dropZone1.addEventListener('dragover', onDragOver);

  dropZone2 = document.querySelector('.drop-zone2');

  dropZone2.addEventListener('drop', onDrop);
  dropZone2.addEventListener('dragenter', onDragEnter);
  dropZone2.addEventListener('dragleave', onDragLeave);
  dropZone2.addEventListener('dragover', onDragOver);

  dropZone3 = document.querySelector('.drop-zone3');

  dropZone3.addEventListener('drop', onDrop);
  dropZone3.addEventListener('dragenter', onDragEnter);
  dropZone3.addEventListener('dragleave', onDragLeave);
  dropZone3.addEventListener('dragover', onDragOver);

  dropZone4 = document.querySelector('.drop-zone4');

  dropZone4.addEventListener('drop', onDrop);
  dropZone4.addEventListener('dragenter', onDragEnter);
  dropZone4.addEventListener('dragleave', onDragLeave);
  dropZone4.addEventListener('dragover', onDragOver);
}

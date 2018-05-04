var c = 0;
var t;
var timer_is_on = 0;
var end_time = 0;

function timedCount() {
    document.getElementById("timerDisplay").innerText = c.toString();
    c = c + 1;
    t = setTimeout(function(){ timedCount() }, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    end_time = c -1; //when users is done with quiz time will stop
    timer_is_on = 0;
}



function showDiv() {
   document.getElementById('showQuestions').style.display = "block";
   //document.getElementById("showQuestions").scrollIntoView({ block: 'end', behavior: 'smooth'});

   startCount();
}

$(document).ready(function()
{    $("#results").click(function() {

if (!$("input[@name=q1]:checked").val() ||
!$("input[@name=q2]:checked").val() ||
!$("input[@name=q3]:checked").val() ||
!$("input[@name=q4]:checked").val() ||
!$("input[@name=q5]:checked").val() ||
!$("input[@name=q6]:checked").val() ||
!$("input[@name=q7]:checked").val() ||
!$("input[@name=q8]:checked").val() ||
!$("input[@name=q9]:checked").val() ||
!$("input[@name=q10]:checked").val()
) {
alert("You're not done yet!");
}

else {
  stopCount();
  var points = 10;
  var cat1name = "1";
  var cat2name = "2";
  var cat3name = "3";
  var cat4name = "4";
  var cat5name = "5";
  var cat6name = "6";
  var cat7name = "7";
  var cat8name = "8";
  var cat9name = "9";
  var cat10name = "10";
  var cat11name = "None";


  var cat1 = ($("input[@name=q1]:checked").val() != "a");

  var cat2 = ($("input[@name=q2]:checked").val() != "b");

  var cat3 = ($("input[@name=q3]:checked").val() != "c");

  var cat4 = ($("input[@name=q4]:checked").val() != "d");

  var cat5 = ($("input[@name=q5]:checked").val() != "a");

  var cat6 = ($("input[@name=q6]:checked").val() != "b");

  var cat7 = ($("input[@name=q7]:checked").val() != "c");

  var cat8 = ($("input[@name=q8]:checked").val() != "d");

  var cat9 = ($("input[@name=q9]:checked").val() != "a");

  var cat10 = ($("input[@name=q10]:checked").val() != "b");

  var cat11 = (!cat1 && !cat2 && !cat3 && !cat4 && !cat5 && !cat6 && !cat7 && !cat8 && !cat9 && !cat10); var categories = [];

  if (cat1) { categories.push(cat1name) };
  if (cat2) { categories.push(cat2name) };
  if (cat3) { categories.push(cat3name) };
  if (cat4) { categories.push(cat4name) };
  if (cat5) { categories.push(cat5name) };
  if (cat6) { categories.push(cat6name) };
  if (cat7) { categories.push(cat7name) };
  if (cat8) { categories.push(cat8name) };
  if (cat9) { categories.push(cat9name) };
  if (cat10) { categories.push(cat10name) };
  if (cat11) { categories.push(cat11name) };

  var catStr = 'You answered the following questions incorrectly: ' + categories.join(', ') + '';
  $("#categorylist").text(catStr);
  $("#categorylist").show("slow");

  if (cat1) { $("#category1").show("slow"); points = points -1;};
  if (cat2) { $("#category2").show("slow"); points = points -1;};
  if (cat3) { $("#category3").show("slow"); points = points -1;};
  if (cat4) { $("#category4").show("slow"); points = points -1;};
  if (cat5) { $("#category5").show("slow"); points = points -1;};
  if (cat6) { $("#category6").show("slow"); points = points -1;};
  if (cat7) { $("#category7").show("slow"); points = points -1;};
  if (cat8) { $("#category8").show("slow"); points = points -1;};
  if (cat9) { $("#category9").show("slow"); points = points -1;};
  if (cat10) { $("#category10").show("slow"); points = points -1;};
  if (cat11) { $("#category11").show("slow"); };
  { $("#closing").show("slow"); };
  // window.alert("You Score is " + (points *10) + " and your time was " + t + "s");
  document.getElementById("score").innerHTML = "Your Score is " + (points *10) + " out of 100 and your time was " + end_time + "s";
  document.getElementById("compare").innerHTML = "Compare how you stack up against other users: "
  + '<a href="../leaderboard">Leaderboard</a>';

  var x = document.getElementById("results");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    var name = prompt('What is your name?');
    var tt = Math.ceil(-(1/2)*end_time +110);
    var score = 0;
    if (points*10 === 100){
      score = Math.floor(((points *10) + tt)/2);
    }
    else {
      score = points;
    }
    score = Math.floor(((points *10) + tt)/2);
    if (score>100){
      score = 100;
    }
    if (score<0){
      score =0;
    }
    $.post('../submit_score', {
        'name': name,
        'quiz': 1,
        'score': score
    });
}
    });
  });

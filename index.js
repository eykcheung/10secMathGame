// index.js


$(document).ready(function (){
  var currentQuestion;
  var timeLeft = 10;
  var score = 0;
  var interval;

  var startGame = function () {
    if (!interval) {            //if the interval does not have a value, we can start the interval
      //call the updateTimeLeft function if timeLeft is 0
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
        interval = setInterval(function () {
          updateTimeLeft(-1);
          $('#time-left').text(timeLeft);
          if (timeLeft === 0) {   //if the interval has an existing value, this ensures a new one does not start
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000)
    }
  }

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  //function: Number Generator
  var randomNumberGenerator = function (limit) {
    return Math.ceil(Math.random() * limit);
  }

  //function: Question Generator
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + ' + ' + String(num2);

    return question;    //question is returned as an object with two properties: answer and eqaution
  }

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  }

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();

});

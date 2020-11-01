// index.js


$(document).ready(function (){
  var currentQuestion;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var interval;



  var slider = document.getElementById("myRange");
  $('#numberLimit').text(slider.value);

  slider.oninput = function () {
    $('#numberLimit').text(slider.value);
  }

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
            if (score > highScore) {
              highScore = score;
              $('#highScore').text(highScore);
            }
            $('#time-left').text('10');
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

  //function: Operator Generator
  var operatorGenerator = function () {
    var checkedOperators = [];

    //prevent having all checkboxes unchecked
    $('.preventUncheck').on('change', function (e) {
      if ($('.preventUncheck:checked').length == 0 && !this.checked) {
        this.checked = true;
      }
    })

    var $testVar = $('.operators');
    var $checkedCheckboxes = $("input[type='checkbox']:checked");


    $checkedCheckboxes.each(function (index, element) {
      checkedOperators.push($(this).val());
    })

    var index = randomNumberGenerator(checkedOperators.length - 1);

    return(checkedOperators[index]);
  }

  //function: Question Generator
  var questionGenerator = function () {
    var operator = operatorGenerator();

    var question = {};
    var num1 = randomNumberGenerator(slider.value);
    var num2 = randomNumberGenerator(slider.value);

    if (operator === 'optionAddition') {
      question.answer = num1 + num2;
      question.equation = String(num1) + ' + ' + String(num2);
    } else if (operator === 'optionSubtraction') {
      if (num1 >= num2) {
        question.answer = num1 - num2;
        question.equation = String(num1) + ' - ' + String(num2);
      } else {
        question.answer = num2 - num1;
        question.equation = String(num2) + ' - ' + String(num1);
      }
    } else if (operator === 'optionMultiplication') {
      question.answer = num1 * num2;
      question.equation = String(num1) + ' * ' + String(num2);
    } else if (operator === 'optionDivision') {
      var num3 = num1 * num2;
        question.answer = num3 / num1;
        question.equation = String(num3) + ' / ' + String(num1);
    }

    return question;    //question is returned as an object with two properties: answer and equation
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

/*jslint browser: true*/
/*global $, jQuery, alert*/

/*
ion.sound({ sounds: [ {name: "branch_break", volume: 0.5, preload: true}, {name: "bell_ring", volume: 0.8, preload: true}, {name: "metal_plate_2", volume: 0.7, preload: true}, {name: "glass", volume: 1.0, preload: true} ], volume: 1.0, path: "http://.com/sounds/", preload: true });
$(document).ready(function () {
    "use strict";
    $("a").on("click", function () {
        ion.sound.play("branch_break");
        console.log("Play Sound");
    });
});
*/

/*** ALL QUIZ DATA IS STORED IN MULTI-DIMENSIONAL ARRAYS BELOW***/
    
        
var MathQuiz = [ 
    ['Addition', 'add-1', ['210', '102', '12', '8'], 3], 
    ['Addition', 'add-2', ['6', '10', '16', '28'], 2], 
    ['Addition', 'add-3', ['4', '31', '13', '3'], 1], 
    ['Addition', 'add-4', ['9', '93', '3', '12'], 4], 
    ['Addition', 'add-5', ['10', '55', '50', '5'], 1], 
    ['Addition', 'add-6', ['14', '8', '6', '68'], 1], 
    ['Addition', 'add-7', ['37', '10', '21', '4'], 2], 
    ['Addition', 'add-8', ['3', '5', '41', '6'], 2], 
    ['Addition', 'add-9', ['6', '12', '14', '104'], 3], 
    ['Addition', 'add-10', ['80', '0', '88', '8'], 4], 
    ['Subtraction', 'sub-1', ['3', '12', '4', '48'], 3], 
    ['Subtraction', 'sub-2', ['7', '3', '5', '16'], 3], 
    ['Subtraction', 'sub-3', ['7', '6', '8', '12'], 2], 
    ['Subtraction', 'sub-4', ['6', '4', '5', '13'], 1], 
    ['Subtraction', 'sub-5', ['3', '4', '1', '9'], 1], 
    ['Subtraction', 'sub-6', ['2', '1', '3', '6'], 2], 
    ['Subtraction', 'sub-7', ['10', '2', '1', '3'], 4], 
    ['Subtraction', 'sub-8', ['0', '1', '77', '7'], 1], 
    ['Subtraction', 'sub-9', ['2', '5', '3', '9'], 3], 
    ['Subtraction', 'sub-10', ['2', '1', '3', '0'], 2], 
    ['Multiplication', 'mult-1', ['79', '63', '97', '16'], 2],
    ['Multiplication', 'mult-2', ['62', '26', '12', '8'], 3], 
    ['Multiplication', 'mult-3', ['24', '11', '5', '83'], 1], 
    ['Multiplication', 'mult-4', ['0', '12', '66', '36'], 4], 
    ['Multiplication', 'mult-5', ['15', '5', '0', '50'], 4], 
    ['Multiplication', 'mult-6', ['1', '56', '87', '78'], 2], 
    ['Multiplication', 'mult-7', ['1', '12', '7', '43'], 2], 
    ['Multiplication', 'mult-8', ['4', '2', '0', '22'], 1], 
    ['Multiplication', 'mult-9', ['1', '18', '8', '9'], 3], 
    ['Multiplication', 'mult-10', ['4', '59', '45', '14'], 3], 
    ['Division', 'div-1', ['1', '7', '14', '0'], 1], 
    ['Division', 'div-2', ['8', '4', '1', '3'], 4], 
    ['Division', 'div-3', ['5', '6', '1', '4'], 1], 
    ['Division', 'div-4', ['25', '2', '4', '10'], 3], 
    ['Division', 'div-5', ['20', '9', '3', '6'], 2], 
    ['Division', 'div-6', ['2', '4', '3', '16'], 3], 
    ['Division', 'div-7', ['9', '6', '3', '2'], 4],
    ['Division', 'div-8', ['2', '9', '3', '1'], 1], 
    ['Division', 'div-9', ['2', '0', '10', '4'], 1], 
    ['Division', 'div-10', ['4', '1', '2', '22'], 2]
    /* order of operation might be too hard....   / , 
    ['OrderOperation 3*3+9', 'image-41', ['', '18', '', ''], 2], 
    ['OrderOperation 10-1-5', 'image-42', ['', '', '4', ''], 3], 
    ['OrderOperation 4*5+10', 'image-43', ['200', '', '', ''], 1], 
    ['OrderOperation 5*8+1', 'image-44', ['', '', '', '41'], 4], 
    ['OrderOperation 8-2/2', 'image-45', ['7', '', '', ''], 1], 
    ['OrderOperation 9*7*1', 'image-46', ['63', '', '', ''], 1], 
    ['OrderOperation 4*1/4', 'image-47', ['', '', '1', ''], 3], 
    ['OrderOperation 4+10+1', 'image-48', ['', '15', '', ''], 2], 
    ['OrderOperation 5*1-2', 'image-49', ['3', '', '', ''], 1], 
    ['OrderOperation 3-2+1', 'image-50', ['', '', '', '2'], 4]
    */
];

var retry;
var quizDataFull = [];
var quizData;
//var quizFullCount;

var score;
var round;

var lastQuestion = 10;
var currentQuestion;

var pic;
var answerA;
var answerB;
var answerC;
var answerD;
var correctAnswer;
var highScore = 0;

var i;
var IMG;



var total;
var type;
var picTemp;

/*** LAUNCHES THE GAME WITH NEW QUIZ DATA ***/
function launch(quizName) {
    "use strict";
    retry = quizName;
    /*jslint evil: true */
    quizDataFull = eval(quizName);
    quizData = [];
    score = 0;
    round = 0;

    //quizFullCount = quizDataFull.length;

    // Shuffle the Quiz Deck
    while (quizData.length < 10) {
        var addData = quizDataFull[Math.floor(Math.random() * quizDataFull.length)];
        if ((quizData.indexOf(addData)) == '-1') {
            quizData.push(addData);
        }
    }
    //console.log(quizData);
    total = quizData.length * 10;
    /*jslint plusplus: true */
    for (i = 0; i < quizData.length; i++) {
        IMG = new Image();
        picTemp = quizData[i][1];
        IMG.src = "css/images/" + picTemp + ".png";
        console.log("Image " + IMG.src + " Loaded");
    }
    // Load the First Question Data
    type = quizData[round][0];
    pic = quizData[round][1];
    answerA = quizData[round][2][0];
    answerB = quizData[round][2][1];
    answerC = quizData[round][2][2];
    answerD = quizData[round][2][3];
    correctAnswer = quizData[round][3];
    pic = "css/images/" + pic + ".png";
    
    // Shuffle the Answers
    var $MultipleChoiceAnswers = $('#quizPopup #quizAnswers');
    $('div', $MultipleChoiceAnswers).sort(function () { return (Math.round(Math.random()) - 0.5); }).appendTo($MultipleChoiceAnswers);

    // Grid the Answer Buttons
    $('#quizPopup #quizAnswers div').removeClass();
    $('#quizPopup #quizAnswers div:even').addClass('ui-block-a');
    $('#quizPopup #quizAnswers div:odd').addClass('ui-block-b');

    // Update the Popup
    $('#quizPopup div.ui-content a').css('border-color', '#2ecc71');
    $('#quizPopup div.ui-content a').css('background-color', '#2ecc71');
    $('#quizPopup h1').html(quizName);
    $('#quizPopup div.ui-content p').html(type);
    $('#quizPopup div.ui-content img').attr('src', pic);
    $('#quizPopup div.ui-content a#1').html(answerA);
    $('#quizPopup div.ui-content a#2').html(answerB);
    $('#quizPopup div.ui-content a#3').html(answerC);
    $('#quizPopup div.ui-content a#4').html(answerD);
    setTimeout(function () { $('#quizPopup').popup("open"); }, 350);
    setTimeout(function () { $('#quizPopup').popup("open"); }, 350);
}

function winPopup() {
    "use strict";
    //ion.sound.play("bell_ring");
    //console.log('You Win');
    setTimeout(function () {
        $('#quizOver h1').html("You Win!");
        $('#quizOver div.ui-content p').html("Congratulations You Win! <br/> You Scored " + score + " Out Of " + total + " Points!");
        $("#quizOver").popup("open");
    }, 600);
}

function nextQuestion() {
    "use strict";
    if (score != total) {
        // Load the next question's Data
        type = quizData[round][0];
        pic = quizData[round][1];
        answerA = quizData[round][2][0];
        answerB = quizData[round][2][1];
        answerC = quizData[round][2][2];
        answerD = quizData[round][2][3];
        correctAnswer = quizData[round][3];
        pic = "css/images/" + pic + ".png";

        setTimeout(function () {
            // Shuffle the Answers
            var $MultipleChoiceAnswers = $('#quizPopup #quizAnswers');
            $('div', $MultipleChoiceAnswers).sort(function () {
                return (Math.round(Math.random()) - 0.5);
            }).appendTo($MultipleChoiceAnswers);
            // Format the answers
            $('#quizPopup #quizAnswers div').removeClass();
            $('#quizPopup #quizAnswers div:even').addClass('ui-block-a');
            $('#quizPopup #quizAnswers div:odd').addClass('ui-block-b');
            $('#quizPopup div.ui-content a').css('border-color', '#2ecc71');
            $('#quizPopup div.ui-content a').css('background-color', '#2ecc71');
            // Update the Popup
            $('#quizPopup div.ui-content p').html(type);
            $('#quizPopup div.ui-content img').attr('src', pic);
            $('#quizPopup div.ui-content a#1').html(answerA);
            $('#quizPopup div.ui-content a#2').html(answerB);
            $('#quizPopup div.ui-content a#3').html(answerC);
            $('#quizPopup div.ui-content a#4').html(answerD);
        }, 450);
        setTimeout(function () {
            $('#quizPopup').popup("open");
        }, 500);
    } else {
        winPopup();
    }
}

/*
function updateHighScore() {
    "use strict";
    $('#quiz p span span').html(highScore);
}

function gameOver() {
    "use strict";
    console.log('Game Over');
    setTimeout(function () {
        $('#quizOver h1').html("Game Over!");
        $('#quizOver div.ui-content p').html("The Game Is Over. <br/> You Scored " + score + " Out Of " + total + " Points!");
        $("#quizOver").popup("open");
    }, 600);
}
*/

function submit(current) {
    "use strict";
    /*jslint plusplus: true */
    if (current.id == correctAnswer) {
        //ion.sound.play("glass");
        $(current).css('background-color', '#0A8536');
        $(current).css('border-color', '#0A520D');
        $("#quizPopup").popup("close");
        round++;
        score += 10;
        //if (score > highScore) {
          //  highScore = score;
        //}
        currentQuestion++;
        nextQuestion();
        //updateHighScore();
    } else {
        //ion.sound.play("metal_plate_2");
        $(current).css('background-color', '#800b25');
        $(current).css('border-color', '#b11a3c');
        $("#quizPopup").popup("close");
        nextQuestion();
        //gameOver();
    }
}

function retryQuiz() {
    "use strict";
    $("#quizOver").popup("close");
    setTimeout(function () {
        launch(retry);
    }, 600);
}
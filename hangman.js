$(function () {

    // initializing all the variable and arrays
    $('#game').hide();
    var word = ["wizard", "rogue", "monk", "cleric", "druid", "ranger", "paladin", "warlock", "barbarian", "warrior", "sorcerer", "dragon"];
    var num1 = Math.floor(Math.random() * 12);
    $('#printer').html("");
    var guess = [];
    var secretWord = [];
    var wrongArray = [];
    var wordVariable = word[num1];
    $('#wordVariableTest').html(wordVariable);
    secretWord = word[num1];

    // starting my guess array with just "_"
    for (var i = 0; i < word[num1].length; i++)
    {
        guess.push("_");
    }

    // the function that displays the game after the start button is clicked
    $('#start').on('click', function f() {
        $('#game').show();
        printWord();
        displayHangman();
        $('#test').html(word[num1].length + " " + word[num1]);

    });

    // the function that runs when the player clicks the button to guess a letter in the word
    $('#guess').on('click', function () {
        var guessLetter = $('#letter').val();
        if(guessLetter.length >= 2)
        {
            $('#error').html("* Please enter a single letter.");
        }
        else {
            $('#error').html("");
            var wrong = 0;
            for (var i = 0; i < secretWord.length; i++) {
                if (guessLetter.toLowerCase() == secretWord[i].toLowerCase()) {
                    guess[i] = guessLetter.toLowerCase();
                    printWord();
                    checkWin();
                }
                if (guessLetter != secretWord[i]) {
                    wrong++;
                }
            }
            if (wrong == secretWord.length) {
                wrongArray.push(guessLetter);
                $('#wrongTest').html(wrongArray.join(", "));
                displayHangman();
                checkLoss();
            }
        }
    });

    // the function that runs when the player clicks the button to guess the word outright
    $('#wordGuess').on('click', function () {
        var wordGuessing = $('#word').val();
        if (wordGuessing == wordVariable)
        {
            for (var i = 0; i < secretWord.length; i++)
            {
                guess[i] = secretWord[i];
                printWord();
            }
            checkWin();
        }
        else
        {
            wrongArray.push(wordGuessing);
            $('#wrongTest').html(wrongArray.join(", "));
            displayHangman();
            checkLoss();
        }
    });

    // function to print out the word to be guessed.  First with "_" and then with actual letters
    function printWord() {
        $('#printer').html("");
        for (var j = 0; j < guess.length; j++) {
            $('#printer').append(guess[j]);
            $('#printer').append(" ");
        }
    }


    //function to check if the player has gotten too many wrong guesses
    function checkLoss() {
        if(wrongArray.length == 6)
        {
            $('#winLoss').html("You Lose!")
        }
    }

    // function to check weather the player has won or not
    function checkWin() {
        var correctLetterCheck = 0;
        for (var i = 0; i < secretWord.length; i++)
        {
            if(guess[i] == secretWord[i])
            {
                correctLetterCheck++;
            }
        }
        if(correctLetterCheck == secretWord.length)
        {
            $('#winLoss').html("You Win!")
        }
    }


    // function to display the new hangman picture after a wrong guess.
    function displayHangman() {
        switch(wrongArray.length)
        {
            case 1:
                $('#hangmanImage').html("<img id='image' alt='hangman' src='./img/hangman2.png'>");
                break;
            case 2:
                $('#hangmanImage').html("<img id='image' alt='hangman' src='./img/hangman3.png'>");
                break;
            case 3:
                $('#hangmanImage').html("<img id='image' alt='hangman' src='./img/hangman4.png'>");
                break;
            case 4:
                $('#hangmanImage').html("<img id='image' alt='hangman' src='./img/hangman5.png'>");
                break;
            case 5:
                $('#hangmanImage').html("<img id='image' alt='hangman' src='./img/hangman6.png'>");
                break;
            case 6:
                $('#hangmanImage').html("<img id='image' alt='hangman' src='./img/hangman7.png'>");
                break;
            default:
                 $('#hangmanImage').html('<img id="image" alt="hangman" src="./img/hangman1.png">');
        }
    }


});
/**
 * Created by lantz on 07/10/2015.
 */

function Game(size, gameId, outFunc)
{
    // Public state
    this.gameId = gameId; //number

    // Private state
    var numberOfRounds = 0; // number
    var currentPlayer = ''; // char
    var output = outFunc; //function that outputs string
    var gameMatrix = new Array(size);
    gameMatrix[0] = new Array(size);
    gameMatrix[1] = new Array(size);
    gameMatrix[2] = new Array(size);

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            gameMatrix[i][j] = '';
        }
    }

    // Public functions
    this.changeState = function (i, j) {
        return changeInnerState(i, j);
    }
    this.setCurrentPlayer = function () {
        establishCurrentPlayer();
    }
    this.getState = function (i, j) {
        return getInnerState(i, j);
    }
    this.getNumberOfRounds = function() {
        return numberOfRounds;
    }
    this.getCurrentPlayer = function() {
        return currentPlayer;
    }

    // Private functions
    function establishCurrentPlayer() {
        if (currentPlayer == '') {
            if (Math.random() > 0.5) {
                currentPlayer = 'x';
            }
            else {
                currentPlayer = 'o'
            }

            output('New game ' + gameId + ', ' + currentPlayer + ' starts');
        }
        else {
            output('Game ' + gameId + ', now is ' + currentPlayer + ' turn');
        }
    }

    function getInnerState(i, j) {
        if (i < 0 || i > 2 || j < 0 || j > 2) {
            return null;
        }

        return gameMatrix[i][j];
    }


    function changeInnerState(i, j) {
        if (i < 0 || i > 2 || j < 0 || j > 2) {
            return null;
        }

        if(gameOver())
        {
            output('Game over!');
            return;
        }

        if (gameMatrix[i][j] == '') {

            gameMatrix[i][j] = currentPlayer;
            numberOfRounds++;

            if (!gameOver()) {
                switchPlayer();
            }
        }
        else {
            output('Please try again ' + currentPlayer);
        }

        return gameMatrix[i][j];
    }


    function switchPlayer(game) {
        if (currentPlayer == 'o') {
            currentPlayer = 'x';
        }
        else {
            currentPlayer = 'o'
        }

        output('Now is ' + currentPlayer + ' turn');
    }


    function gameOver() {
        if (isCurrentPlayerWinner()) {
            output('Game over. Player ' + currentPlayer + ' won!');
            return true;
        }
        else if (numberOfRounds >= 9) {
            output('Game over. It is a tie');
            return true;
        }

        return false;
    }


    function isCurrentPlayerWinner() {
        var sameDiag1 = 0;
        var sameDiag2 = 0;

        for (i = 0; i < 3; i++) {

            var same1 = 0;
            var same2 = 0;

            for (j = 0; j < 3; j++) {
                if (gameMatrix[i][j] == currentPlayer) {
                    same1++;
                }
                if (gameMatrix[j][i] == currentPlayer) {
                    same2++;
                }
            }

            console.log('same1 ' + same1);
            console.log('same2 ' + same2);
            if (same1 == 3 || same2 == 3) {
                return true;
            }

            if (gameMatrix[i][i] == currentPlayer) {
                sameDiag1++;
            }

            if (gameMatrix[2 - i][i] == currentPlayer) {
                sameDiag2++;
            }
        }

        console.log('sameDiag1 ' + sameDiag1);
        console.log('sameDiag2 ' + sameDiag2);
        if (sameDiag1 == 3 || sameDiag2 == 3) {
            return true;
        }

        return false;
    }
}
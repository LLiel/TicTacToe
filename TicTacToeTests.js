QUnit.test( "new Game(..) - check state", function( assert ) {

    // Arrange
    var testSubject = new Game(2, -1, function (txt) { /* do nothing */
    });

    // Verify
    assert.equal(testSubject.getNumberOfRounds(), 0, 'Number of rounds');
    assert.equal(testSubject.getCurrentPlayer(), '','Current player');

    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            assert.equal(testSubject.getState(i, j), '', 'cell ' + i + ', ' + j);
        }
    }

    assert.equal(testSubject.getState(3,3), null, 'Out of range cell');
});


QUnit.test( "setCurrentPlayer() / getCurrentPlayer()", function( assert ) {

    // Arrange
    var outputCalls = 0;
    var testSubject = new Game(3, -1, function (txt) {
        outputCalls++;
    });

    // Act
    testSubject.setCurrentPlayer();

    // Verify
    var player = testSubject.getCurrentPlayer();
    assert.ok(player =='x' || player == 'o','Current player');
    assert.equal(outputCalls, 1, 'output(...) was called');

    // Act (call again)
    testSubject.setCurrentPlayer();

    // Verify
    assert.equal(testSubject.getCurrentPlayer(), player,'Current player did not change');
    assert.equal(outputCalls, 2, 'output(...) was called again');
});


QUnit.test( "changeState() and getState()", function( assert ) {

    // Arrange
    var outputCalls = 0;
    var testSubject = new Game(3, -1, function (txt) {
        outputCalls++;
    });


    // Act
    testSubject.setCurrentPlayer();

    // Verify output calls
    assert.equal(outputCalls, 1, 'establishCurrentPlayer was  called');

    // Act
    var player = testSubject.getCurrentPlayer();

    // Verify output calls
    assert.equal(outputCalls, 1, 'establishCurrentPlayer was not  call');

    // Act
    var currentState = testSubject.changeState(1,2);

    // Verify output calls - outputCalls +1 because of switch player function
    assert.equal(outputCalls, 2, 'output(...) was  called again');

    // Verify - changeState()
    assert.equal(testSubject.getState(1,2),currentState, 'get state is a current state');
    assert.equal(currentState, player,'currentState is current player');
    assert.equal(testSubject.getNumberOfRounds(), 1, 'changeInnerState was called ');
    assert.equal(outputCalls, 2, 'output(...) was not');

    // Act
    var currentState = testSubject.changeState(1,2);

    // Verify output calls
    assert.equal(outputCalls, 3, 'output(...) was  called again because the place 1,2 already in use');

});



QUnit.test( "gameOver() states", function( assert ) {

    // Change state that calls for change inner state calls for gameOver function (private function)

    var lastMessage;

    var saveLastMessage =  function (txt) {
        lastMessage = txt;
    };

    var playNotFinalState = function (x,y) {
        testSubject.changeState(x, y);
        assert.ok(lastMessage.indexOf('Game over') < 0);
    };

    var playFinalStateWinner = function (x,y) {
        testSubject.changeState(x, y);
        assert.equal(lastMessage, 'Game over. Player ' + testSubject.getCurrentPlayer() + ' won!');
    };

    var playFinalStateTie = function (x,y) {
        testSubject.changeState(x, y);
        assert.equal(lastMessage, 'Game over. It is a tie');
    };

    var playInvalidState = function (x,y) {
        assert.equal(testSubject.getState(x,y), '', 'Sanity check failed, existing state is not empty');
        testSubject.changeState(x, y);
        assert.equal(testSubject.getState(x,y), '', 'Should not change once the game is over');
    };

    // Row
    var testSubject = new Game(3, -1, saveLastMessage);
    testSubject.setCurrentPlayer();
    playNotFinalState(0,0);
    playNotFinalState(0,1);
    playNotFinalState(1,0);
    playNotFinalState(0,2);
    playFinalStateWinner(2,0);

    // Tie
    testSubject = new Game(3, -1, saveLastMessage);
    testSubject.setCurrentPlayer();
    playNotFinalState(0,0);
    playNotFinalState(1,1);
    playNotFinalState(2,2);
    playNotFinalState(2,1);
    playNotFinalState(0,1);
    playNotFinalState(0,2);
    playNotFinalState(2,0);
    playNotFinalState(1,0);
    playFinalStateTie(1,2);

    // First diagonal
    testSubject = new Game(3, -1, saveLastMessage);
    testSubject.setCurrentPlayer();
    playNotFinalState(0,0);
    playNotFinalState(0,1);
    playNotFinalState(1,1);
    playNotFinalState(2,1);
    playFinalStateWinner(2,2);


    // Second diagonal
    testSubject = new Game(3, -1, saveLastMessage);
    testSubject.setCurrentPlayer();
    playNotFinalState(0,0);
    playNotFinalState(0,2);
    playNotFinalState(1,2);
    playNotFinalState(1,1);
    playNotFinalState(2,2);
    playFinalStateWinner(2,0);

    // Verify that once won, cannot play again.
    playInvalidState(1, 0);
});







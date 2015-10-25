/**
 * Created by lantz on 24/09/2015.
 */
var messageDiv;
var buttons;
var currentGame;
var arrayOfGames = [];
var size = 3;

function startGame()
{
    buttons = document.getElementsByClassName('btn');
    messageDiv = document.getElementById('messages');
    messageDiv.innerText = '';

    // New game instance
    currentGame = new Game(size, arrayOfGames.length + 1, ouputMessage);
    arrayOfGames.push(currentGame);
    loadGame(currentGame);
}

function ouputMessage(str)
{
    messageDiv.innerText = str;
}

function changeGame(gameIdStr)
{
    var gameId = parseInt(gameIdStr);
    //check if the game exists
    for(i=0; i< arrayOfGames.length; i++)
    {
        if (arrayOfGames[i].gameId == gameId)
        {
            loadGame(arrayOfGames[i]);
            return;
        }
    }
    // if doesn't exist
    ouputMessage('The game ' + gameId + ' does not exists! Please try again');
}


function loadGame(game)
{
    for(k =0; k < buttons.length; k++)
    {
        var i = k%size;
        var j = Math.floor(k/size);

        buttons[k].value = game.getState(i, j);
        buttons[k].setAttribute("i", i);
        buttons[k].setAttribute("j", j);
        buttons[k].onclick = function()
        {
            var i = parseInt(this.getAttribute("i"));
            var j = parseInt(this.getAttribute("j"));

            game.changeState(i, j);
            this.value = game.getState(i, j);
        };
    }

    game.setCurrentPlayer();
}
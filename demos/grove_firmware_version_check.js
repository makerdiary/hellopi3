var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;

var board;

function start() {
    console.log('starting...');
    board = new Board({
        debug: true,
        onError: function(err) {
            console.log('Oops! Something error.');
            console.log(err);
        },
        onInit: function(res) {
            if(res) {
                console.log('GrovePi Version : ' + board.version());
            }
        }
    });
    board.init();
}

function onExit(err) {
    console.log('closing...');
    board.close();
    process.removeAllListeners();
    process.exit();
    if (typeof err != 'undefined') {
        console.log(err);
    }
}


//start the app
start();

// catches ctrl+c event
process.on('SIGINT', onExit);

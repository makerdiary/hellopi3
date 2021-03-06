var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;

var board;

// Connect the Grove LED to digital port D4
var led = 4;

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
    board.pinMode(led,"output");

    var ledState = true;
    
    setInterval(function() {
        board.writeBytes(Commands.dWrite.concat([led, ledState?1:0, Commands.unused]));
        ledState = !ledState;
    }, 1000);
}

function onExit(err) {
    console.log('closing...');
    board.writeBytes(Commands.dWrite.concat([led, 0, Commands.unused]));
    board.close();
    process.removeAllListeners();
    process.exit();
    if (typeof err != 'undefined')
        console.log(err);
}

//start the app
start();

// catches ctrl+c event
process.on('SIGINT', onExit);

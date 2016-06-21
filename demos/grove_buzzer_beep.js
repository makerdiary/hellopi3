var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;

var board;

// Connect the Grove Buzzer to digital port D3
var buzzer = 3;

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
    board.pinMode(buzzer,"output");

    var buzzerState = true;
    
    setInterval(function() {
        board.writeBytes(Commands.dWrite.concat([buzzer, buzzerState?1:0, Commands.unused]));
        buzzerState = !buzzerState;
    }, 1000);
}

function onExit(err) {
    console.log('closing...');
    board.writeBytes(Commands.dWrite.concat([buzzer, 0, Commands.unused]));
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

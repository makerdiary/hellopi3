var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;
var GenericDigitalInputSensor = GrovePi.sensors.DigitalInput;

var board;
var button = 2;                 // Connect the Grove Button to digital port D2               


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
    var buttonState = 0, lastButtonState = 0;

    setInterval(function() {
        lastButtonState = buttonState;
        buttonState = board.writeBytes(Commands.dRead.concat([button, Commands.unused, Commands.unused]));
        if(lastButtonState != buttonState) {
            console.log("Button State onChange value= " + buttonState);
        }
    }, 20);

}

function onExit(err) {
    console.log('ending');
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

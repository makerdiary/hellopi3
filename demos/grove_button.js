var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;
var DigitalInputSensor = GrovePi.sensors.DigitalInput;

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
                
                // Connect the Grove Button to digital port D2               
                var groveButton = new DigitalInputSensor(2);

                // Grove Button
                console.log('Grove Button (start watch)');
                groveButton.on('change', function(res) {
                    console.log('Grove Button onChange value=' + res);
                });
                groveButton.watch();
            }
        }
    });
    board.init();
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
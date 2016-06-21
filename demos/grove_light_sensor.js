var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;
var LightAnalogSensor = GrovePi.sensors.LightAnalogSensor;

var board;

// Connect the Grove Light Sensor to digital port A2
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
                
                var lightSensor = new LightAnalogSensor(2);

                // Light Sensor 
                setInterval(function() {
                    var resistance = lightSensor.read();
                    console.log('The resistance of Light Sensor: ' + resistance);
                }, 1000);
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

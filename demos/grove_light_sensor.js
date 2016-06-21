var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;
var LightAnalogSensor = GrovePi.sensors.LightAnalog;

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
                console.log('Light Analog Sensor (start watch)');
                
                lightSensor.on('change', function(res) {

                    //Calculate resistance of sensor in K
                    var val = (1023 - res) * 10 / res;

                    console.log('Light onChange value: %.2f', val);
                });

                lightSensor.watch();
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

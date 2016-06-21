var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;
var UltrasonicDigitalSensor = GrovePi.sensors.UltrasonicDigital;

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
                
                // Connect the Grove Ultrasonic Digital Sensor to digital port D7                
                var ultrasonicSensor = new UltrasonicDigitalSensor(7);

                // Ultrasonic Ranger
                console.log('Ultrasonic Ranger Digital Sensor (start watch)')
                ultrasonicSensor.on('change', function(res) {
                    console.log('Ultrasonic Ranger onChange value=' + res)
                });
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

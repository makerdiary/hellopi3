var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;
var DHTDigitalSensor = GrovePi.sensors.DHTDigital;

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
                
                // Connect the Grove Temperature&Humidity Sensor to digital port D8                
                var dhtSensor = new DHTDigitalSensor(8, DHTDigitalSensor.VERSION.DHT22, DHTDigitalSensor.CELSIUS);
                // DHT Sensor
                console.log('DHT Digital Sensor (start watch)');
                dhtSensor.on('change', function(res) {
                    console.log('DHT onChange value=' + res)
                });
                dhtSensor.watch(500); // milliseconds

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
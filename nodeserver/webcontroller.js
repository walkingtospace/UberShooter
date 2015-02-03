/*
* Using sensors and LEDs with Galileo
* Nicolas Vailliet
* Intel(R) Corporation
* 2014-04-03
* Pierre Collet
* Intel(R) Corporation
* 2014-10-14
* License Creative Commons 3.0
* http://creativecommons.org/licenses/by/3.0 
*/

/**** indicate if led is on or off ****/
var ledstatus = "off";

var system = require('child_process').exec;

/*
 * Turn on the LED connected to pin8
 */
function turnOnLed()
{
    system("sh ./onLed.sh");
    ledstatus = "on";
}

/*
 * Turn off the LED connected to pin8
 */
function turnOffLed()
{
    system("sh ./offLed.sh");
    ledstatus = "off";
}

function hit(mraa){
     var light = new mraa.Gpio(7);
     var buzz = new mraa.Gpio(8);
     light.dir(mraa.DIR_OUT);
     buzz.dir(mraa.DIR_OUT);
     light.write(0);
     buzz.write(0);
     light.write(1);
     buzz.write(1);
     setTimeout(function(){
	light.write(0);
        buzz.write(0);
     },1000);    	
}
/*
 * About controlling galileo with a webpage
 */
function startServer()
{
	console.log("Starting web controller...");

	var http = require('http');
	http.createServer(function (req, res) {

		 function respond() {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write("<!DOCTYPE html><html><body>");		
			res.write("<h1>Intel Galileo web controller</h1>");
			res.write("</p><p>LED Status : ");
			res.write(ledstatus);
			res.write("</p><p>Actions</p>");
			res.write("<p><input type='button' onclick='location.pathname = \"/ledOn\"' value='Turn LED on'/></p>");
			res.write("<p><input type='button' onclick='location.pathname = \"/ledOff\"' value='Turn LED off'/></p>");
                        res.write("<p><input type='button' onclick='location.pathname = \"/hit\"' value='Hit'/></p>");
			res.write("</body></html>");
	  		res.end();
		}

		console.log("Request: " + req.url);
		var mraa = require('mraa');
                
		if(req.url === "/ledOn")
			turnOnLed();
		else if(req.url === "/ledOff")
			turnOffLed();
                else if(req.url === "/hit")
			hit(mraa);

		respond();
  		
	}).listen(1337);
	console.log('Server running at http://localhost:1337/');
}

/*
 * What we want to run
 */
console.log("Starting server");
startServer();




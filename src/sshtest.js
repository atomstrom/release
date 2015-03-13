//Host object 
host = {
  server: {       
    host:         "151.252.41.179",
    port:         "",
    userName:     "fholder",
    password:     "",
    passPhrase:   "privateKeyPassphrase", //optional default:"" 
    privateKey:   require('fs').readFileSync('id_rsa_high5') //optional default:"" 
  },
  hosts:               [], //optional default:[] 
  commands:            [
                          "cd /var/www/coachdata.high5.com/",
                          "ls -la"
                        ],
  msg: {
    send: function( message ) {
      console.log(message);
    }
  }, 
  verbose:             true,  //optional default:false 
  debug:               false,  //optional default:false 
  idleTimeOut:         5000,        //optional: value in milliseconds (default:5000) 
  connectedMessage:    "Connected", //optional: on Connected message 
  readyMessage:        "Ready",     //optional: on Ready message 
  closedMessage:       "Closed",    //optional: on Close message 
};

//Create a new instance 
var SSH2Shell = require ('ssh2shell'),
    SSH       = new SSH2Shell(host);
 
//Start the process 
//SSH.connect();

module.exports = SSH;



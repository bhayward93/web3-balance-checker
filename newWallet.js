const request = require('request');

/**
 *Creates a new BTC address using the BlockCypher API
 */
function newBTCAddress(){
	request.post('https://api.blockcypher.com/v1/btc/test3/addrs', { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		try{
			console.log("Success! Bitcoin address created. Please be sure to save your private key in a safe location. \n\n")
	  		console.log(body);
		} catch(e){
	  		console.log("Something has went wrong with the APIs endpoint. Please try again later.");
		}
	});
}

/**
 *Creates a new Eth address using the BlockCypher API
 */
function newEthAddress(){
	request.post('https://api.blockcypher.com/v1/beth/test/addrs', { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		try{
			console.log("\n\n-----\n\nSuccess! Ethereum address created. Please be sure to save your private key in a safe location. \n\n")
	  		console.log(body);
		} catch(e){
	  		console.log("Something has went wrong with the APIs endpoint. Please try again later.");
		}
	});
}
newBTCAddress();
newEthAddress();

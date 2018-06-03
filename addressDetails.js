const Web3 = require("web3");
const testAddress = '0x0Ca13c198b796918196A862C521106e2BcB157c3';
const request = require('request');
const crypto = require('crypto');

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

	/*
 	* Gets the balance of an ether address.
 	*/
    exports.getBalance = function(address){
		web3.eth.getBalance(testAddress, function (error, result) {
			if(!error){
				var balance = web3.utils.fromWei(result,'ether');
				console.log("Web3 connected with the Blockchain & should have the balance of "+balance+" ETH");
				return balance; 
			} 
			console.log("Error, check that you have the Geth up and running")
			return null;	    
			
		});
	}

	/**
	 * Directly logs the transactions assosciated with an address in console.  
	 */
    exports.getHistory  = function(address){   
		request('http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address='+address, { json: true }, (err, res, body) => {
		  if (err) { return console.log(err); }
		  console.log(body);
		});
	}

//logTransactionHistory(testAddress);
//getBalance(testAddress);
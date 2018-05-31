const Web3 = require("web3");
const address = '0x0Ca13c198b796918196A862C521106e2BcB157c3';
const request = require('request');

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let balance =  web3.eth.getBalance(address, function (error, result) {
    if (error) {
    	console.log("Error!");
    } else {
        console.log('Ether:', web3.utils.fromWei(result,'ether')); 
    }
});

/**
 * Directly logs the transactions assosciated with an address in console.  
 */
function logTransactionHistory(addr){   
	request('http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address='+addr, { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  console.log(body);
	});
}
logTransactionHistory("0x0Ca13c198b796918196A862C521106e2BcB157c3");
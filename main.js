const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const crypto = require('crypto');
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:false}));

const Web3 = require("web3");
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const testAddress = '0x0Ca13c198b796918196A862C521106e2BcB157c3';

/*
 * Gets the balance of an ether address.
 */
async function getBalance(address){
	var _balance;
	var x = web3.eth.getBalance(address, function (error, result) {
		if(!error){
			_balance = web3.utils.fromWei(result,'ether');
			return _balance;
		}
			    
	});
	await x;
	return _balance;
}

/**
 * Directly logs the transactions assosciated with an address in console.  
 */
function getHistory(address){   
	request('http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address='+address, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		  return console.log(body);
	});
}

/*Initial state; the only option for a user is to enter an address.
 *
 *http://localhost:3000/
 */
app.get('/', function (req, res) {
 	res.render(
        'index',
        {headerTitle: 'Balance Checker'})
});


/*An address has been posted.
 *
 *http://localhost:3000/ 
 */
app.post('/', async function (req, res) {
	try{
		var _balance = await getBalance(req.body.address);
		console.log("in post fn: "+_balance);

		res.render(
	        'index',
	        {headerTitle: 'Balance Checker',  
	        balance: _balance
	    })
	} catch(e){
		console.log('A critical error has occurred.');
		console.log(e);
	}
});

// 404 URL.
app.use(function(req, res, next) {
    res.status(404).send("404: Sorry, but the resource that you have requested does not exist on this server.");
});

//Start the server on port 3000.
app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});

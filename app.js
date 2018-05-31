var Web3 = require("web3");
let address = '0x0Ca13c198b796918196A862C521106e2BcB157c3';

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let balance =  web3.eth.getBalance(address, function (error, result) {
    if (error) {
        reject(error);
    } else {
        console.log('Ether:', web3.utils.fromWei(result,'ether')); 
    }
});
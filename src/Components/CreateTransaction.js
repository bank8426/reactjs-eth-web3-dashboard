import React from 'react';
import Web3 from 'web3';
class CreateTransaction extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {value: 0, sender : "" ,senderPassphase : "",senderConfirmPassphase : "" , receiver :"" ,receiverPassphase : "" , transactionHash:""};

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.createNewTransaction = this.createNewTransaction.bind(this);
	    this.createNewTransaction2 = this.createNewTransaction2.bind(this);
	    this.displayNewTransaction = this.displayNewTransaction.bind(this);
	}

	handleChange(event) {
	  	const target = event.target;
	    const name = target.name;
	    const value = target.value;
	    this.setState({
	      [name]: value
	    });
	    //console.log(name + value);
	}

	//new account address can show by set state of "newAccount"
	displayNewTransaction(sendTransactionResult){
		console.log("hello");
	  	this.setState({transactionHash: sendTransactionResult.transactionHash});
	  	console.log(sendTransactionResult);
		console.log("send complete");
	}

	createNewTransaction2(error, gas){
		var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		var senderAddress = this.state.sender;
		var senderPassphase = this.state.senderPassphase
		var receiverAddress = this.state.receiver;
		var amountToSend = this.state.value
		var sendTransactionResult;
		//create a new transaction object 
		var transactionObject = {
		    from: senderAddress,
		    to: receiverAddress,
		    value: amountToSend
		}
		var displayNewTransaction = this.displayNewTransaction;
		//console.log(this);
		this.setState({transactionHash: "Please wait"});
		web3.eth.getGasPrice(function (error, gasPrice) {
			var gasPrice = Number(gasPrice);
			var transactionFee = gasPrice * gas;
			//console.log("Fee : " + transactionFee);
			//ethereum
			transactionObject.value = (transactionObject.value - transactionFee);

			
			console.log("sending transaction : please wait")
			//send transaction
			var sendTransaction = web3.eth.sendTransaction(transactionObject);
			//sendTransactionResult = sendTransaction
			//asd();
			sendTransaction.then(displayNewTransaction);
			//console.log(sendTransaction);
		})//.then(this.displayNewTransaction(sendTransactionResult));
		this.setState({value: 0, sender : "" ,senderPassphase : "" , receiver : "" ,receiverPassphase : ""});
	}
	//
	createNewTransaction(unlockSenderAccountResult){
		var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		var senderAddress = this.state.sender;
		var senderPassphase = this.state.senderPassphase
		var receiverAddress = this.state.receiver;
		var receiverPassphase = this.state.receiverPassphase
		var amountToSend = this.state.value
		/*console.log(senderAddress);
		console.log(receiverAddress);
		console.log(amountToSend);*/
		//create a new transaction object 
		var transactionObject = {
		    from: senderAddress,
		    to: receiverAddress,
		    value: amountToSend
		}
		//console.log(transactionObject);

		/*calculate value of transfer - the calculated fee that is required to send the transaction. 
		The fee is calculated by the formula GasPrice * RequiredGas.*/
		web3.eth.estimateGas(transactionObject, this.createNewTransaction2 );
		
	}

	handleSubmit(event) {
		if(this.state.senderPassphase === this.state.senderConfirmPassphase)
  		{
			//connect
			var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
			var senderAddress = this.state.sender;
			var senderPassphase = this.state.senderPassphase

		  	//unlock account then go create transaction
		  	var unlockSenderAccount = web3.eth.personal.unlockAccount(senderAddress, senderPassphase, 3)
	        unlockSenderAccount.then(this.createNewTransaction);
		}
	  	else
	  	{
	  		alert('Error : Passphase and Confirm-Passphase not match');
	  		
	  	}
	  	this.setState({senderPassphase: "" , senderConfirmPassphase : ""});
	    event.preventDefault();
	}

	render() {
		return (
		<div className="CreateTransaction"  style={{ backgroundColor: 'Cornsilk' }}>
			<h2>Create Transaction</h2>
			<form onSubmit={this.handleSubmit}>
		        <label>
					Sender:
					<textarea type="text" name="sender"  value={this.state.sender} onChange={this.handleChange} />
				</label>
				<br/><br/>
				<label>
					Sender-Passphase:
				 	<input type="password" name="senderPassphase"  value={this.state.senderPassphase} onChange={this.handleChange} />
				</label>
				<br/><br/>
				<label>
					Sender-Confirm-Passphase:
				 	<input type="password" name="senderConfirmPassphase"  value={this.state.senderConfirmPassphase} onChange={this.handleChange} />
				</label>
				<br/><br/>

				<label>
					Receiver:
					<textarea type="text" name="receiver"  value={this.state.receiver} onChange={this.handleChange} />
				</label>
				<br/><br/>
				
				<label>
					Amount to transfer(wei)(Fee ~ 21000000000000):
				 	<input type="text" name="value"  value={this.state.value} onChange={this.handleChange} />
				</label>
				<br/><br/>
		        <input type="submit" value="Submit" />
	      	</form>
			<br/>
	      	<label>
				Transaction Hash:  
				<textarea  type="text" name="transactionHash"  value={this.state.transactionHash} readOnly/>
			</label>
			<br/><br/>
		</div>);
	}
};

export default CreateTransaction;
/*
<label>
					Receiver-Passphase:
				 	<input type="password" name="receiverPassphase"  value={this.state.receiverPassphase} onChange={this.handleChange} />
				</label>
				<br/><br/>v
*/
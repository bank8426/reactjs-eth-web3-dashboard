import React from 'react';
import Web3 from 'web3';

class NewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',passphase : '', confirmPassphase : '' , newAccount : ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayNewAccount = this.displayNewAccount.bind(this);
  }

  //new account address can show by set state of "newAccount"
  displayNewAccount(accountAddress){
  	this.setState({newAccount: accountAddress});
  	console.log(accountAddress)
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

  

  handleChangeConfirmPassPhase(event) {
    this.setState({confirmPassphase: event.target.value});
  }

  handleSubmit(event) {

  	//if passphase and confirm match then start create new account
  	if(this.state.passphase === this.state.confirmPassphase)
  	{
  		console.log("yes");
  		//connect to test server
  		var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  		var newAccount = web3.eth.personal.newAccount(this.state.passphase)
  		//create account and show it on text area
  		this.setState({newAccount: "Please wait"});
  		var newAccountAddress = newAccount.then(this.displayNewAccount)/*{
  			console.log(newAccountResult);
  			return newAccountResult;
		});*/
		console.log(newAccountAddress);
  	}
  	else
  	{
  		alert('Error : Passphase and Confirm-Passphase not match');
  		
  	}
    
    this.setState({passphase: "" , confirmPassphase : ""});

    event.preventDefault();
  }

  render() {
    return (
    	<div className="NewAccount" style={{ backgroundColor: 'LightCoral' }}>
	    	<h2>New Account</h2>
	      	<form onSubmit={this.handleSubmit}>
		        <label>
					Passphase:
					<input type="password" name="passphase"  value={this.state.passphase} onChange={this.handleChange} />
				</label>
				<br/><br/>
				<label>
					Confirm-Passphase:
				 	<input type="password" name="confirmPassphase"  value={this.state.confirmPassphase} onChange={this.handleChange} />
				</label>
				<br/><br/>

		        <input type="submit" value="Submit" />
	      	</form>
	      	<br/>
	      	<label>
				New Account Address:  
				<textarea  type="text" name="newAccount"  value={this.state.newAccount} readOnly/>
			</label>
			<br/><br/>
			
      	</div>
    );
  }
}




/*
const NewAccount =()=> {
	return (
	<div className="NewAccount"  >
	<h2>New Account</h2>
		<form>
		  <label>
		    Passphase:
		    <input type="password" name="name" />
		  </label>
		  <br/><br/>
		  <label>
		    Confirm-Passphase:
		    <input type="password" name="name" />
		  </label>
		  <br/><br/>
		  <input type="submit" value="Submit" />
		</form>
		
	</div>)
};*/

export default NewAccount;
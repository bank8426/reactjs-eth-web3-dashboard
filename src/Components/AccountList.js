import React from 'react';
import Web3 from 'web3';
class AccountList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {AccountList: []};
	    this.displayAccountList = this.displayAccountList.bind(this);
	    this.updateAccountList = this.updateAccountList.bind(this);
	    this.updateAccountList();

	}

	updateAccountList()
	{
		//connect
	    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	    //eth get account
	    web3.eth.getAccounts().then(this.displayAccountList)
	}

	displayAccountList(AccountList)
	{
		this.setState({AccountList : AccountList})
		//console.log(this.state.AccountList)
	}


	render() {
		return (
			<div className="AccountList"  style={{backgroundColor: "LightGreen"}}>
				<h2>Your Account List</h2>
				<ul>
				{
					this.state.AccountList.map((account,key) =>
	            	<p key={key}>{key}:      {account}</p>
	        	)}
				</ul>
				<br/><br/>
			</div>
		);
	}
}

export default AccountList;
import React from 'react';
import NewAccount from '../Components/NewAccount';
import AccountList from '../Components/AccountList';
import CreateTransaction from '../Components/CreateTransaction';
import Faucet from '../Components/Faucet';

const DashBoard =()=> {
	//console.log(person.about);
	/*const asd={props.name};*/
	//console.log(person.name);

	return (
	<div className="DashBoard"  >
		<h1>DashBoard</h1>
		<NewAccount/>
		<CreateTransaction/>
		<AccountList/>
		<Faucet/>
	</div>)
};

export default DashBoard;
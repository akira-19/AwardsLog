import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";


function InstituionInput(props){
    return (
            <form>
                <input type="text" value={props.studentInfo.studentId} onChange={props.changeInfo}/>
            </form>
    );
}

function InstituionOutput(props){
    return(
        <p>{props.studentInfo.studentId}</p>
    );
}


const studentInfo = {
    studentId: "",
    studentName: "",
    institutionName: "",
    award: "",
    GraduationDate: ""
};

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          storageValue: 0,
          studentInfo: studentInfo,
          web3: null,
          accounts: null,
          contract: null
      };
      this.changeInfo = this.changeInfo.bind(this);
  }
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };



  changeInfo(e){
      this.setState({studentInfo: {
          studentId: e.target.value
      }});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

          <nav>10 weeks project</nav>
          <div>here is toppage</div>
          <InstituionInput studentInfo={this.state.studentInfo} changeInfo={this.changeInfo}/>
          <InstituionOutput studentInfo={this.state.studentInfo}/>
          <div></div>
      </div>
    );
  }
}

export default App;

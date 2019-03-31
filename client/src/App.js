import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import bg from "./background.jpg"

import "./App.css";


function InstituionInput(props){
    return (
        <div id="instituionInput">
            <h2>Register an Award</h2>
            <form id="use" onSubmit={props.registerAward}>
                <div className="formInput">
                    <span>Student ID:</span>
                    <input type="text" value={props.studentInfo.studentId　|| ""} name="studentId" onChange={props.changeInfo}/>
                </div>
                <div className="formInput">
                    <span>Student Name:</span>
                    <input type="text" value={props.studentInfo.studentName || ""} name="studentName" onChange={props.changeInfo}/>
                </div>
                <div className="formInput">
                    <span>Award:</span>
                    <input type="text" value={props.studentInfo.award || ""} name="award" onChange={props.changeInfo}/>
                </div>
                <div className="formInput">
                    <span>Date:</span>
                    <input type="date" value={props.studentInfo.graduationDate || ""} name="graduationDate" onChange={props.changeInfo}/>
                </div>
                <div className="formInput">
                    <span></span>
                    <input className="inputText" type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}

function InstituionOutput(props){
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return(
        <div id="output">
            <div id="proofLetter">
                <p>{months[month]} {day}, {year}</p>
                <p>To Whom It May Concern,</p>
                <p>This letter will verify that
                    <span> {props.studentInfo.studentName} </span>
                    <span> (ID: {props.studentInfo.studentId}) </span>
                   graduated from
                   <span> {props.institutionName} </span>
                   with
                   <span> {props.studentInfo.award} </span>
                   on
                   <span> {props.studentInfo.graduationDate} </span>
                </p>
                <p>
                   If you need additional information, please contact us via email or phone.
                </p>

            </div>
            <hr/>
        </div>
    );
}

function SearchAward(props){
    return(
        <div id="searchAward">
            <h2>Find an Award</h2>
            <form id="searchForm" onSubmit={props.searchAward}>
                <div className="searchInput">
                    <span>Institution ID:</span>
                    <input
                        className="inputText"
                        name="institutionId"
                        type="text"
                        value={props.searchInput.institutionId || ""}
                        onChange={props.updateSearchBox}/>
                </div>
                <div className="searchInput">
                    <span>Student ID:</span>
                    <input
                        className="inputText"
                        type="text"
                        name="studentId"
                        value={props.searchInput.studentId || ""} onChange={props.updateSearchBox}
                        />
                </div>
                <div className="searchInput">
                    <span></span>
                    <input className="inputText" type="submit" value="Search" />
                </div>
            </form>        </div>
    );
}

function SearchResult(props){
    if (props.studentAward.studentId){
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDate();
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return (
            <div id="awardOutput">
                <div id="awardProof">
                    <p>{months[month]} {day}, {year}</p>
                    <p>To Whom It May Concern,</p>
                    <p>This letter will verify that
                        <span> {props.studentAward.studentName} </span>
                        <span> (ID: {props.studentAward.studentId}) </span>
                       graduated from
                       <span> {props.institutionName} </span>
                       with
                       <span> {props.studentAward.award} </span>
                       on
                       <span> {props.studentAward.graduationDate} </span>
                    </p>
                    <p>
                       If you need additional information, please contact us via email or phone.
                    </p>

                </div>
                <hr/>
            </div>
        );
    }else{
        return(
            <div id="awardOutput">
                <div id="awardProof">
                    <h2>The result will be showed here.</h2>
                </div>
                <hr/>
            </div>
        );
    }
}


function RegisterInstitution(props){
    return (
        <div>
            <div id="registerInstitution">
                <h2>Register an Institution</h2>
                <form id="registerInstitutionForm" onSubmit={props.registerInstitution}>
                    <div className="searchInput">
                        <span>Institution Name:</span>
                        <input className="inputText"
                            type="text" value={props.institutionName}
                            onChange={props.updateInstitutionName}
                            />
                    </div>
                    <div className="searchInput">
                        <span></span>
                        <input className="inputText" type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Usage(){
    return (
        <div id="usage">
            <div className="usageList">
                <h3>1. Register an Award</h3>
                <p>Register an award, and anyone can find the information by the student number and the institution address.</p>
                <h3>2. Find an Award</h3>
                <p>You can find authorized students&#39; information by a student number and an institution address.</p>
                <h3>3. Register as an Institution</h3>
                <p>It should be allowed to register institutions by only the contract owner (or in another authorized way), but anyone can register as an institution here. Your address will be the institution ID.</p>
                <h3>* Use Ropsten network</h3>
            </div>
        </div>
    );
}


const studentInfo = {
    studentId: "",
    studentName: "",
    institutionName: "",
    award: "",
    graduationDate: ""
};

const studentAward = {
    studentId: "",
    studentName: "",
    institutionName: "",
    award: "",
    graduationDate: ""
};

const searchInput  = {
    institutionId: "",
    studentId: ""
}

const institutionName = "";



class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          studentInfo: studentInfo,
          searchInput: searchInput,
          studentAward: studentAward,
          institutionName: institutionName,
          web3: null,
          accounts: null,
          contract: null
      };
      this.changeInfo = this.changeInfo.bind(this);
      this.registerInstitution = this.registerInstitution.bind(this);
      this.updateInstitutionName = this.updateInstitutionName.bind(this);
      this.registerAward = this.registerAward.bind(this);
      this.searchAward = this.searchAward.bind(this);
      this.updateSearchBox = this.updateSearchBox.bind(this);
  }

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

    const userInstitution = await contract.methods.getInstitution().call();
    this.setState({
        institutionName: userInstitution
    })
    console.log(userInstitution);
  };



  changeInfo(e){
      let property = e.target.name;
      let studentInfo = Object.assign({}, this.state.studentInfo)
      studentInfo[property] = e.target.value;
      this.setState({
              studentInfo: studentInfo
      });
  }

  updateSearchBox(e){
      let property = e.target.name;
      let searchInput = Object.assign({}, this.state.searchInput)
      searchInput[property] = e.target.value;
      this.setState({
              searchInput: searchInput
      });
  }

  updateInstitutionName(e){
      this.setState({
          institutionName: e.target.value
      });
  }

  registerInstitution = async (e) => {
      e.preventDefault();
      const { accounts, contract } = this.state;
      const institutionName = this.state.institutionName;
      await contract.methods.registerInstitution(institutionName).send({ from: accounts[0] });
  }

  registerAward = async (e) => {
      e.preventDefault();
      const { accounts, contract } = this.state;
      const studentId = this.state.studentInfo.studentId;
      const studentName = this.state.studentInfo.studentName;
      const award = this.state.studentInfo.award;
      const graduationDate = this.state.studentInfo.graduationDate;

      await contract.methods.addAwardInfo(studentId, studentName, award, graduationDate).send({ from: accounts[0] });
  }

  searchAward = async (e) => {
       e.preventDefault();
       const { accounts, contract } = this.state;
       const institutionId = this.state.searchInput.institutionId;
       const studentId = this.state.searchInput.studentId;

       let awardInfo = await contract.methods.getAwardInfo(studentId, institutionId).call()

       awardInfo = {
           studentId: awardInfo.studentId,
           studentName: awardInfo.studentName,
           institutionName: awardInfo.institutionName,
           award: awardInfo.award,
           graduationDate: awardInfo.graduationDate
       };

       this.setState({
           studentAward: awardInfo
       });
  }



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
          <nav className="navbar">
              <div className="title"><a href="#">10 weeks project</a></div>
              <div className="menu">
                  <ul>
                      <li><a className="" href="#usage">How to use</a></li>
                      <li><a className="" href="#use">Use the Dapp</a></li>
                  </ul>
              </div>
          </nav>
          <div id="toppage" style={{backgroundImage:`url(${bg})`}}>
              <div className="titleText">
                  <h2>Awards Log</h2>
                  <p>Get your authorized award information</p>
              </div>
          </div>

          <SearchAward
              searchInput={this.state.searchInput}
              searchAward={this.searchAward}
              updateSearchBox={this.updateSearchBox}
          />

          <SearchResult
              studentAward={this.state.studentAward}
              institutionName={this.state.institutionName}
           />

          <InstituionInput
              studentInfo={this.state.studentInfo} changeInfo={this.changeInfo}
              registerAward={this.registerAward}
          />

          <InstituionOutput
              studentInfo={this.state.studentInfo}
              institutionName={this.state.institutionName}
          />

          <RegisterInstitution
              institutionName={this.state.institutionName} registerInstitution={this.registerInstitution}
              updateInstitutionName={this.updateInstitutionName}
              />

          <Usage/>
      </div>
    );
  }
}

export default App;

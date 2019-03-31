pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
  struct awardInfo {
      uint id;
      string studentId;
      string name;
      string award;
      string gradDate;
      string institution;
  }


  awardInfo[] public awards;

  mapping (address => string) institution;



  // @ Don't consider the situation where a student has several awards from the same institution and the same student ID
  function getAwardInfo(string memory _studentId, address _institution) public view returns (awardInfo memory) {
      string memory institutionName = institution[_institution];
      for(uint i = 0; i < awards.length; i++){
          if(keccak256(abi.encode(awards[i].studentId)) == keccak256(abi.encode(_studentId)) && keccak256(abi.encode(awards[i].institution)) == keccak256(abi.encode(institutionName))){
              return awards[i];
          }
      }
  }


  function addAwardInfo(string memory _studentId, string memory _name, string memory _award, string memory _gradDate) public  {
      //require(institution[msg.sender]);
      uint id = rondNum();
      string memory institutionName = institution[msg.sender];
      awardInfo memory award = awardInfo(id, _studentId, _name, _award, _gradDate, institutionName);
      awards.push(award);
  }

  function rondNum() private view returns (uint) {
      return uint(keccak256(abi.encode(block.number)));
  }

  function registerInstitution(string memory _name) public  {
      institution[msg.sender] = _name;
  }

  function getInstitution()public view returns (string memory) {
      return institution[msg.sender];
  }

}

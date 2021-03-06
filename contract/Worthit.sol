pragma solidity^0.4.24;
pragma experimental ABIEncoderV2;
import "./Ownable.sol";
import "./SafeMath.sol";

contract Worthit is Ownable{
    using SafeMath for uint;

    /// @dev user information including name, age, address, introduce and etc.
    struct userInfo{
        string name;
        uint8 age;
        string realAddress;
        string introduce;
    }
    /// @dev a user 
    struct user{
        address userAddr;
        userInfo info;
    }

    /// @dev event that notify new user
    event userAdded(string _name, uint8 _age, string _intro);

    /// @dev mapping address to user
    mapping(address => user) addressToUser;

    user[] public users;
    uint public userCount = 0;

    /// @dev if there are some name exist at a given address, then
    ///      it mean already other user exist. So only User can add
    ///      when exist the default string in name at a given address.
    modifier isEmptyUser(address _addr){
        require(bytes(addressToUser[_addr].info.name).length == 0);
        _;
    }

    /// @dev User info is made by given params like name, age, realAddress, 
    ///      and introduce.
    function addUserInfo(string _name, uint8 _age, string _addr, string _intro) internal pure returns(userInfo ui){
        userInfo memory newInfo;
        newInfo.name = _name;
        newInfo.age = _age;
        newInfo.realAddress = _addr;
        newInfo.introduce = _intro;
        return newInfo;
    }
    /// @dev make user object 
    /// @param _userAddr user's account address
    /// @param _name     user's full name
    /// @param _age      user's age
    /// @param _addr     user's real address in real
    function addUser(address _userAddr, string _name, uint8 _age, string _addr, string _intro) isEmptyUser(_userAddr) public returns(bool){
        userInfo memory info = addUserInfo(_name, _age, _addr, _intro);
        if(bytes(info.name).length == 0){
            // have to alert to user that should input user's name
            return false;
        }
        user memory newUser = user(_userAddr, info);
        addressToUser[_userAddr] = newUser;
        users.push(newUser);
        userCount = userCount.add(1);
        emit userAdded(_name, _age, _intro);
        return true;
    }

    function getUserInfoByAddress(address _userAddr) internal view returns(userInfo ui){
        userInfo memory whoisit = addressToUser[_userAddr].info;
        return whoisit;
    }

    function getUserInfo(address _userAddr) public view returns(string _name, uint8 _age, string _addr, string _intro) {
        userInfo memory who = getUserInfoByAddress(_userAddr);
        return (who.name, who.age, who.realAddress, who.introduce);
    }
    function getUserCount() public view returns(uint) {
        return userCount;
    }

    function getUserIndex() view internal returns(uint) {
        for(uint i = 0 ; i < users.length ; i++){
            if(users[i].userAddr == msg.sender){
                return i;
            }
        }
    }

    function deleteUser() external {
        uint index = getUserIndex();
        delete addressToUser[msg.sender];
        delete users[index];
        for(uint i = index; i < users.length-1; i++){
            users[i] = users[i+1];
        }
        users.length = users.length.sub(1);
        userCount = userCount.sub(1);
    }

    function getAllUsers() public returns(user[]){
        return users;
    }
}
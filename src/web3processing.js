let worthIt;
let userAccount;

const startApp = () => {
    let didUserListUpdated = 0;
    const worthItAddress = '0x7105211b7fda5120a3d42126d3f8eabc21c951e4';
    worthIt = new web3.eth.Contract(worthitABI, worthItAddress);

    let checkAccountChange = setInterval(async function() {
        // 계정이 바뀌었는지 확인
        let currentAccount = await web3.eth.getAccounts().then(function(array) { return array[0] });
        if (currentAccount !== userAccount) {
            userAccount = currentAccount;
            // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출
            alert('Your account is ' + userAccount);
        }
    }, 1000);
    if(didUserListUpdated == 0){
        didUserListUpdated = 1;
        loadUser();
    }
};

const getUserCount = () => {
    console.log(worthIt.methods.getUserCount().call());
    return worthIt.methods.getUserCount().call();
};

const addUser = (_name, _age, _address, _introduce) => {

    console.log('registering new user on blockchain...');

    return worthIt.methods.addUser(userAccount, _name, _age, _address, _introduce)
        .send({ from: userAccount })
        .on("receipt", function(receipt) {
            console.log("Successfully registered " + _name + "!");
            location.reload();
        })
        .on("error", function(error){
            console.log(error);
        });
};

const loadUser = () => {
    $('#user-board').empty();

    return worthIt.methods.getAllUsers().call()
        .then(function(users){
            users.forEach(function(element){
                //console.log(element);
                $('#user-board').append(`<div class=user-card>
<ul>
    <li>이름: ${element[1].name}</li>
    <li>나이: ${element[1].age}</li>
    <li>주소: ${element[1].realAddress}</li>
    <li>인사말: ${element[1].introduce}</li>
</ul>
</div>`);
            });
    });

};

const deleteUser = () => {
    return worthIt.methods.deleteUser()
        .send({from: userAccount})
        .on('receipt', function(receipt){
            console.log('Your account successfully deleted!');
            location.reload();
        })
        .on('error', function(error){
            console.log(error);
        });

};

window.addEventListener('load', function() {

    // Web3가 브라우저에 주입되었는지 확인(Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Mist/MetaMask의 프로바이더 사용
        web3 = new Web3(web3.currentProvider);
        alert('web3가 주입되었습니다.');

    } else {
        // 사용자가 Metamask를 설치하지 않은 경우에 대해 처리
        // 사용자들에게 Metamask를 설치하라는 등의 메세지를 보여줄 것
        alert('메타마스크 계정을 찾을 수 업습니다. 메타마스크 설치 후 메타마스크 계정에 로그인하세요');
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // 이제 자네 앱을 시작하고 web3에 자유롭게 접근할 수 있네:
    startApp();

});
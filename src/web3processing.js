let worthIt;
let userAccount;

const startApp = () => {
    const worthItAddress = '0xb03597e6fcaf550301130e196f6d3f69ed024102';
    worthIt = new web3js.eth.Contract(worthitABI, worthItAddress);

    /*var accountInterval = setInterval(function() {
        // 계정이 바뀌었는지 확인
        if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
            // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출
            alert('Your account have changed!');
        }
    }, 1000);*/
}

const getUserCount = () => {
    console.log(worthIt.methods.getUserCount().call());
    return worthIt.methods.getUserCount().call();
}

const addUser = (_name, _age, _address, _introduce) => {

    console.log('registering new user on blockchain...');

    return worthIt.methods.addUser(userAccount, _name, _age, _address, _introduce)
        .send({ from: userAccount })
        .on("receipt", function(receipt) {
            console.log("Successfully registered " + _name + "!");
        })
        .on("error", function(error){
            console.log(error);
        });
}

window.addEventListener('load', function() {

    // Web3가 브라우저에 주입되었는지 확인(Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Mist/MetaMask의 프로바이더 사용
        web3js = new Web3(web3.currentProvider);
        alert('web3가 주입되었습니다.');
        console.log(web3.currentProvider);
        //console.log('Accounts: ' + web3.eth.accounts);
        //console.log('Coin base: ' + web3.eth.accounts[0]);
    } else {
        // 사용자가 Metamask를 설치하지 않은 경우에 대해 처리
        // 사용자들에게 Metamask를 설치하라는 등의 메세지를 보여줄 것
        alert('메타마스크 계정을 찾을 수 업습니다. 메타마스크 설치 후 메타마스크 계정에 로그인하세요');
    }

    // 이제 자네 앱을 시작하고 web3에 자유롭게 접근할 수 있네:
    startApp();

})
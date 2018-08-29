'use strict';

var worthIt = void 0;

var startApp = function startApp() {
    var worthItAddress = '0x0dcd2f752394c41875e259e00bb44fd505297caf';
    worthIt = new web3js.eth.Contract(worthitABI, worthItAddress);
};

window.addEventListener('load', function () {

    // Web3가 브라우저에 주입되었는지 확인(Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Mist/MetaMask의 프로바이더 사용
        web3js = new Web3(web3.currentProvider);
    } else {
        // 사용자가 Metamask를 설치하지 않은 경우에 대해 처리
        // 사용자들에게 Metamask를 설치하라는 등의 메세지를 보여줄 것
        alert('메타마스크 계정을 찾을 수 업습니다. 메타마스크 설치 후 메타마스크 계정에 로그인하세요');
    }

    // 이제 자네 앱을 시작하고 web3에 자유롭게 접근할 수 있네:
    startApp();
});
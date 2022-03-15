// main.moを呼び出す
import { minter } from "../../declarations/minter";
// Dfinityが提供するprincipalを使用するためのライブラリ
import { Principal } from "@dfinity/principal";

// 要素（plug参照：https://docs.plugwallet.ooo/build-an-app-examples/build-app-plugged/）
const els = {};

// 要素リストへの要素の割り当て
function main() {
  els.btnConnect = document.getElementById("btnConnect");
  els.btnMint = document.getElementById("btnMint");

  Object
  .values(els)
  .filter((el) => el.nodeName === 'BUTTON')
  .forEach((el) => el.addEventListener(
      'click',
      onButtonPressHandler
    )
  )
}

// ボタンが押されたときの処理
function onButtonPressHandler(el) {
  const name = el.target.id;
  switch (name) {
    case 'btnConnect':
      onBtnConnect();
      break;
    case 'btnMint':
      onBtnMint();
      break;
    default:
      return;
  };
}

// plugを接続する
async function onBtnConnect() {
  const nnsCanisterId = 'ryjl3-tyaaa-aaaaa-aaaba-cai'
  const minterCanisterId = 'r7inp-6aaaa-aaaaa-aaabq-cai'

  const whitelist = [
    nnsCanisterId,
    minterCanisterId,
  ];

  const publicKey = await window.ic?.plug?.requestConnect({
    whitelist,
  });

  const principalId = await window.ic.plug.agent.getPrincipal();
  console.log(`Plug's user principal Id is ${principalId}`);
  document.getElementById("principal").innerHTML = `Your principal ID: &nbsp;${principalId}`;

  document.getElementById("title").style.visibility = "visible";
  document.getElementById("grid").style.visibility = "visible";
}

// imageをクリックしたときの処理
document.addEventListener('DOMContentLoaded',function(){
  let btnClick = document.querySelectorAll('.png');
  for(var i = 0; i < btnClick.length; i++){
      btnClick[i].addEventListener('click',function(){
        document.getElementById("uri").value = this.src;
      },false);
  }
},false);

// mintを実行する
async function onBtnMint() {
  const uri = document.getElementById("uri").value.toString();
  console.log("The url we are trying to mint is " + uri);

  const principal = await window.ic.plug.agent.getPrincipal();

  const mintId = await minter.mint_principal(uri, principal);
  console.log("The id is " + Number(mintId));

  document.getElementById("collection").src = await minter.tokenURI(mintId);
  document.getElementById("greeting").innerText = `this nft owner is ${principal} \n
  this token id is ${Number(mintId)}`;
}

// ドキュメントの準備ができたらMain関数を呼び出す
document.addEventListener("DOMContentLoaded", main);
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = balance;
withdrawButton.onclick = withdraw;

console.log(ethers);
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected!";
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install Meta Mask";
  }
}
async function balance() {
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log("Funding with ${ethAmount}");
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenforTransactionMine(transactionResponse, provider);
      //provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }
}
function listenforTransactionMine(transactionResponse, provider) {
  console.log("Mining ${transactionResponce.hash}");
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log("Completed with confirmations");
      resolve();
    });
  });
}
async function withdraw() {
  if (typeof window.ethereum != "undefined") {
    console.log("Withdrawing....");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponce = await contract.withdraw();
      await listenforTransactionMine(transactionResponce, provider);
    } catch (error) {
      console.log(error);
    }
  }
}

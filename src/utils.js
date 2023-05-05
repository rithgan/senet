import axios from "axios"
import Swal from "sweetalert2"
const url = "https://api.linkdao.network"
const config = require('./config.json')


export const getPrice = async () => { //get lkd price
  const response = await axios.get(url + '/api/tokenPrice')
  return response.data.data
}

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const getBusdPrice = async () => { //get busd price
  let res = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BUSDUSDT')
  let price = res.data['price']
  return price
}


export const uploadStake = async (txnHash, deposit, account, ipAddress, loginData, price) => {

  const currentDate = Date.now()

  // const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  // const indianDateTimeFormat = currentDate.toLocaleString('en-IN', options);

  // console.log('Indian Date and Time:', indianDateTimeFormat);
  let packId = 0
  if (deposit > 99) {
    packId = 1
  }
  else if (deposit > 199) {
    packId = 2
  }
  else if (deposit > 499) {
    packId = 3
  }


  let data = JSON.stringify({
    "address": account,
    "ip": ipAddress,
    "ulid": loginData.ulid,
    "packId": packId,
    "thash": txnHash,
    "tokenlkd": deposit / price,
    "price": price,
    "usd": deposit,
    "tranTime": currentDate
  });

  let axiosConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${config.baseUrl}/api/stake`,
    headers: {
      'address': account,
      'ip': ipAddress,
      'ulid': loginData.ulid,
      'auth': loginData.auth,
      'token': loginData.token,
      'Content-Type': 'application/json'
    },
    data: data
  };
  console.log(axiosConfig)
  try {
    let response = await axios.request(axiosConfig)
    console.log(response.data)
    Swal.fire({
      icon: 'success',
      title: 'Transaction successful',
      text: `${deposit} USDT deposited`,
      footer: `<a href='https://testnet.bscscan.com/tx/${txnHash}' target='_blank'>View transaction</a>`
    })
  } catch (err) {
    console.error(err)
  }
}


export const checkStakeInfo = async(ipAddress,loginData)=>{
  let data = JSON.stringify({
    "address": loginData.address,
    "ip": ipAddress,
    "ulid": loginData.ulid
  });
  
  let axiosConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${config.baseUrl}/api/stakeinfo`,
    headers: { 
      'address': '7314380', 
      'ip': '1:1:1:1', 
      'auth': 'b0b4ac9458450ea7a16a7c5ac3ed4dad', 
      'token': '0f983c29e28ba3eb93fe7c50949bd8ea', 
      'ulid': 'ADMIN', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(axiosConfig)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    let res = JSON.stringify(response.data)
    return res.status
  })
  .catch((error) => {
    console.log(error);
  });
}
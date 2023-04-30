import axios from "axios"
const url  = "https://api.linkdao.network"


export const getPrice = async () => { //get lkd price
    const response = await axios.get(url+'/api/tokenPrice')
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
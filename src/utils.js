import axios from "axios"
const url  = "https://api.linkdao.network"


export const getPrice = async () => { //get lkd price
    const response = await axios.get(url+'/api/tokenPrice')
    return response.data.data
  }
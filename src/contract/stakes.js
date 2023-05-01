import { ethers } from 'ethers'

const contract = async (provider, poolAddress, poolABI) => {
    let signer = provider.getSigner();
    let contract = new ethers.Contract(poolAddress, poolABI, signer);
    return contract;
};

export const depositAmount = async (provider, poolAddress, poolABI, amount,wallet) => {
    let cont = await contract(provider, poolAddress, poolABI)
    if(amount === wallet){
        amount = amount-1
    }
    await cont.investAmount(ethers.utils.parseEther(amount.toString()))
}

export const depositedAmt = async (provider, pool, poolABI, userAddress) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.getUserTotalInvestments(userAddress)
    res = res.map((hex) => ethers.BigNumber.from(hex))
    const sum = res.reduce((accumulator, currentValue) =>
        accumulator.add(currentValue)
    );
    return parseFloat(ethers.utils.formatUnits(sum, 18)).toFixed(3)
}

export const withdraw = async (provider, pool, poolABI) => {
    let cont = await contract(provider, pool, poolABI)
    await cont.withdrawReward()
}

export const dailyReward = async (provider, pool, poolABI, account) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.getTotalProfit(account)
    return parseFloat(ethers.utils.formatUnits(res, 18)).toFixed(3)
}


export const totalStakedFunc = async (provider, pool, poolABI) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.totalInvestments()
    return parseFloat(ethers.utils.formatUnits(res, 18)).toFixed(2)
}

export const getWithdrawableTotalProfit = async (provider, pool, poolABI, account) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.getWithdrawableTotalProfit(account)
    return parseFloat(ethers.utils.formatUnits(res, 18)).toFixed(3)
}

export const totalRewardsPaid = async (provider, pool, poolABI) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.totalReward()
    return parseFloat(ethers.utils.formatUnits(res, 18)).toFixed(2)
}
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
    let res =  await cont.investAmount(ethers.utils.parseEther(amount.toString()))
    let conf = await res.wait()
    return conf
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

export const reInvest = async(provider, pool, poolABI) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.reinvestReward()
    // return parseFloat(ethers.utils.formatUnits(res, 18)).toFixed(2)
    let conf = await res.wait()
    return conf
}

export const getUserInvestmentsByPackage = async(provider, pool, poolABI,account,index) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.getUserInvestmentsByPackage(account,index)
    return parseFloat(ethers.utils.formatUnits(res, 18))
}

export const getRewards = async(provider, pool, poolABI,account)=>{
    let cont = await contract(provider, pool, poolABI)
    let investments = await cont.getUserInvestments(account)
    let obj = {
        6:0,
        8:0,
        10:0,
        12:0
    }
    let max = {
        6:0,
        8:0,
        10:0,
        12:0
    }
    let maxReward = 0
    investments.map(async(inv)=>{
        inv = parseInt(inv)
        let {roiPercentage,totalReward,maxReward} = await cont.investments(inv)
        roiPercentage = parseInt(ethers.utils.formatUnits(roiPercentage, 2))
        totalReward = parseInt(ethers.utils.formatUnits(totalReward, 18))
        maxReward = parseInt(ethers.utils.formatUnits(maxReward, 18))
        obj[roiPercentage]+=totalReward
        max[roiPercentage]+=maxReward
    })
    return [obj,max]
}
import { ethers } from 'ethers'
import axios from 'axios';
import { TransactionTypes } from 'ethers/lib/utils';

const apip = async () => {
    let axiosConfig = {
        method: 'get',
        url: 'https://oracal.linkdaodefi.network/updatePrice',
        // updatePrice 
    };
    try {
        let response = await axios.request(axiosConfig)

        return response.status
    } catch (err) {
        console.log(err)
    }

}
const contract = async (provider, poolAddress, poolABI) => {
    let signer = provider.getSigner();
    let contract = new ethers.Contract(poolAddress, poolABI, signer);
    return contract;
};

export const depositAmount = async (provider, poolAddress, poolABI, amount, wallet) => {
    let api = await apip();

    if (api === 200) {
        let cont = await contract(provider, poolAddress, poolABI)
        if (amount === wallet) {
            amount = amount - 1
        }
        console.log(ethers.utils.parseEther(amount.toString()))
        try {

            let res = await cont.investAmount(ethers.utils.parseEther(amount.toString()))
            let conf = await res.wait()
            return conf
        } catch (err) {
            console.error(err.code)
            if (err.code === -32603) {
                return false
            }
        }
    }
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
    let api = await apip();
    if (api === 200) {
        let cont = await contract(provider, pool, poolABI)
        await cont.withdrawReward()
    }
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

export const reInvest = async (provider, pool, poolABI) => {
    let api = await apip();
    if (api === 200) {
        let cont = await contract(provider, pool, poolABI)
        let res = await cont.reinvestReward()
        // return parseFloat(ethers.utils.formatUnits(res, 18)).toFixed(2)
        let conf = await res.wait()
        return conf
    }
}

export const getUserInvestmentsByPackage = async (provider, pool, poolABI, account, index) => {
    let cont = await contract(provider, pool, poolABI)
    let res = await cont.getUserInvestmentsByPackage(account, index)
    return parseFloat(ethers.utils.formatUnits(res, 18))
}

export const getRewards = async (provider, pool, poolABI, account) => {
    let cont = await contract(provider, pool, poolABI)
    let investments = await cont.getUserInvestments(account)
    let obj = {
        6: 0,
        8: 0,
        10: 0,
        12: 0
    }
    let max = {
        6: 0,
        8: 0,
        10: 0,
        12: 0
    }
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
    }
    let maxReward = 0
    let det = Promise.all(investments.map(async (inv) => {
        inv = parseInt(inv)
        let { roiPercentage, totalReward, maxReward, startDate, totalInvestment, lkdPrice } = await cont.investments(inv)
        let totalProfit = await cont.getWithdrawableTotalProfitForInvestment(inv)
        console.log(totalProfit)
        totalProfit = parseFloat(ethers.utils.formatUnits(totalProfit, 18))
        lkdPrice = parseFloat(ethers.utils.formatUnits(lkdPrice, 2))
        roiPercentage = parseInt(ethers.utils.formatUnits(roiPercentage, 2))
        totalReward = parseFloat(ethers.utils.formatUnits(totalReward, 18)) * lkdPrice
        maxReward = parseFloat(ethers.utils.formatUnits(maxReward, 18)) * lkdPrice
        let currDate = new Date(Date.now())
        startDate = new Date(parseInt(ethers.utils.formatUnits(startDate, 0)) * 1000)
        let days = Math.abs(startDate - currDate)
        days = Math.round(days / (1000 * 60 * 60 * 24));
        startDate = startDate.toLocaleString('en-GB', options)
        console.log(days, startDate)
        totalInvestment = parseFloat(ethers.utils.formatUnits(totalInvestment, 18)) * lkdPrice
        obj[roiPercentage] += totalReward
        max[roiPercentage] += maxReward
        return { roiPercentage, totalReward, maxReward, startDate, totalInvestment, lkdPrice, inv, days, totalProfit }
    }))
    // return [obj,max]
    // console.log((await det).sort((a,b)=>b.startDate - a.startDate))
    return det
}
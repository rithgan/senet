import React, { useState, useContext } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { NetworkContext } from '../../context/NetworkContext';
import { ConnectContext } from '../../context/ConnectContext';

export default function Stake({ token, apr, network, img, pool, poolABI, contract, month }) {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState(false)
  const [account] = useContext(NetworkContext)
  const [provider] = useContext(ConnectContext)
  const [deposit, setDeposit] = useState(0)
  const [deposited, setDeposited] = useState(0)
  const [wallet, setWallet] = useState(0)
  const [daily, setDaily] = useState(0)
  const [totalStaked, setTotalStaked] = useState(0)
  const [profit, setProfit] = useState(0)
  const [price, setPrice] = useState(0)
  return (
    <div>
      <div className='container-xxl flex-grow-1 container-p-y'>
        <div className='row'>
          <div className="card mb-4">
            <div onClick={() => setIsActive(!isActive)}>
              <div className='card-header' style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 style={{ marginBottom: 0 }}>{token}</h5>
                  <p style={{ marginBottom: 0 }}><em>Stake LKD - Earn LKD</em></p>
                </div>
                <div style={{maxHeight:'4rem'}}>
                  <img src={img} alt="sample" role="presentation"
                    className="jcssp311"
                    width="100"
                    height="100" />
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row g-3">
                      <div className="col-12 col-md-2">
                        <div>{wallet} LKD</div>
                        <div className="text_grey">Wallet</div>
                      </div>
                      <div className="col-12 col-md-2">
                        <div>{wallet} LKD</div>
                        <div className="text_grey">Deposited</div>
                      </div>
                      <div className="col-12 col-md-2">
                        <div>{wallet} LKD</div>
                        <div className="text_grey">APR</div>
                      </div>
                      <div className="col-12 col-md-2">
                        <div>{wallet} LKD</div>
                        <div className="text_grey">LKD Reward</div>
                      </div>
                      <div className="col-12 col-md-2">
                        <div>{wallet} LKD</div>
                        <div className="text_grey">TVL</div>
                      </div>
                      <div className="col-12 col-md-2">
                        <div className="ml" style={{ textAlign: "start" }}>
                          {isActive ? <AiFillCaretUp /> : <AiFillCaretDown />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isActive && (
              <div className="accordion-content">
                <div className="borderpool"></div>
                <div className="main001">
                  <div className="jssp205">
                    <div className="ct1-inputpool">
                      <input type="text" placeholder="0.0" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                      {/* <span className="ct1-max"> MAX</span> */}
                    </div>
                    {/* <ReactSlider/> */}
                    <div className="claim_box">
                      {status
                        ? <><div className="pool_approve fmsize"  >Deposit</div> <div className="pool_approve back_grey fmsize" style={{ background: "rgb(122, 119, 110)" }}>Approve</div></>
                        : <><div className="pool_approve back_grey fmsize" style={{ background: "rgb(122, 119, 110)" }}>Deposit</div> <div className="pool_approve  fmsize" >Approve</div></>
                      }
                    </div>
                    <p className="text_grey fsmall margin25 text_center" style={{ margin: 0, marginTop: '1rem' }}>Min. deposit 1 LKD, Max. deposit 5000 LKD </p>
                    <p className="text_grey fsmall text_center" style={{ margin: 0 }}>Deposit fee 0%</p>

                  </div>

                  <div className="jssp205 margintop25">
                    <div className="claimdiv">
                      <div className="ct1-inputpool" style={{ flexBasis: '50%', lineHeight: '1.3rem' }}>
                        <p>LKD Earned</p>
                        <p style={{ fontSize: '1.9rem' }}>{profit}</p>
                        <p style={{ fontSize: "smaller", color: "#9a9ab4", marginTop: '0.8rem' }}>${parseFloat(price * profit).toFixed(3)}</p>
                      </div>
                      {/* <ReactSlider/> */}
                      <div className="claim_box" style={{ flexBasis: '50%' }}>
                        <div className="pool_claim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%" }}>Withdraw</div>
                        {/* <div className="pool_claim">Withdraw All</div> */}
                      </div>
                    </div>
                    <p className="text_grey fsmall margin25 text_center">After deposit, you can withdraw every 30 days up to {month} month!</p>
                    <p className="text_grey fsmall text_center" style={{ margin: 0 }}>Withdraw fee 0%</p>
                  </div>

                  <div className="jssp2052 margintop25">
                    <div className="ct1-inputpool width100pool">

                      <p className="lkdpara" style={{ margin: 0 }}><span>Pool Limit</span> <span>100,000.00 LKD</span></p>
                      <p className="lkdpara" style={{ margin: 0 }}><span>LKD Staked</span> <span>{totalStaked} LKD</span></p>
                      <p style={{ margin: 0 }}><a className="text_grey" href="https://pancakeswap.finance/swap?inputCurrency=0xaf027427dc6d31a3e7e162a710a5fe27e63e275f">Buy token <FiExternalLink style={{ color: "#03c3ec" }} /></a></p>
                      <p style={{ margin: 0 }}><a className="text_grey" href={contract}>View Contract <FiExternalLink style={{ color: "#03c3ec" }} /></a></p>
                      <p style={{ margin: 0 }}><a className="text_grey" href="https://github.com/blocksafu111/audit/blob/main/LinkDaoStaking-Audit-by-BlockSAFU.pdf">View Audit <FiExternalLink style={{ color: "#03c3ec" }} /></a></p>
                    </div>

                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

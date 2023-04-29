import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import Stake from './Stake';
import {data} from '../../data/stake'
import "./Stake.css";


export default function Stakes() {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar  ">
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            {data.map(({ token, apr, daily, tvl, network, img,pool,poolAbi,contract,month })=>{
                                return <Stake
                                token={token}
                                apr={apr}
                                tvl={tvl}
                                network={network}
                                img={img}
                                pool={pool}
                                poolABI={poolAbi}
                                contract={contract}
                                month={month}/>
                            })}
                            <Footer />
                        </div>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
                <div className="drag-target"></div>
            </div>
        </>
    )
}

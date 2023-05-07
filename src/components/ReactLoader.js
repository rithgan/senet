import React from 'react'
import LKD from '../images/LKD.svg'
import './ReactLoader.css'

export default function ReactLoader() {
  return (
    <div style={{margin:'auto'}}>
        <img src={LKD} alt="Page loading" width={100} height={100} className='pulse-animation' ></img>
    </div>
  )
}

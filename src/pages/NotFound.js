import React from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import Link from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function NotFound() {
  const history = useHistory()
  useEffect(()=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'The Page you are looking for does not exist',
      timer:1700,
      timerProgressBar:true
    })
    setTimeout(()=>{
      history.goBack('/dash')
    },2000)
  },[history])
  return (
    <>
    <h2>404</h2>
    </>
  )
}

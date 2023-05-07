import React from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-dark-theme.css';

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

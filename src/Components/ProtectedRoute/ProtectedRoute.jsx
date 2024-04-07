import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({children}) {

  let navigate = useNavigate()

  useEffect(()=>{
    if (!localStorage.getItem('userToken')) {
      navigate('/login')
    }
  } , [])

  return children
}
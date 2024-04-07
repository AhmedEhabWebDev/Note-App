import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function InverseProtectedRoute({children}) {

  let naveigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      naveigate('/')
    }
  },[])

  return children
}

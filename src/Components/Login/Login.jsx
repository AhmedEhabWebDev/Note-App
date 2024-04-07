import { Link, useNavigate } from "react-router-dom";
import notesImg from "../../images/notes1.png";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from 'yup'
import { Triangle } from 'react-loader-spinner';

export default function Login() {

  let [apiMag, setApiMag] = useState()
  let [loading, setLoading] = useState(false)

  let navigate =  useNavigate()

 async function logIn(values) {
  setLoading(true)
  let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn' , values)
  .catch((err) => {
    setApiMag(err.response.data.msg)
  })
  console.log(data);
  if (data.msg == 'done') {
    localStorage.setItem('userToken', data.token)
    setApiMag(data.msg);
    navigate('/')
    setLoading(false)
  }
 }

 let validationSchema = yup.object({
  email: yup.string().email('Please Enter Valid Email').required('Email is Required'),
  password: yup.string().matches(/^[\w @]{4,8}$/ , 'at least uppercase , lowercase , one digit , special chars').required('Password is Required'),
 })

 let formik =  useFormik({
  initialValues: {
    email:'',
    password:''
  },validationSchema
  ,onSubmit:logIn
 })


  return (
    <>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />

                    {formik.touched.email? <p>{formik.errors.email}</p>: null}

                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />

                    {formik.touched.password? <p>{formik.errors.password}</p>: null}
                    {loading? <button className="btn btn-info text-light">
                      <Triangle
                      visible={true}
                      height="25"
                      width="25"
                      color="#fff"
                      ariaLabel="triangle-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      />
                    </button> 
                    : 
                    <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-info text-light w-100 rounded-2 mt-2">Login</button>}

                  </form>
                  {apiMag? <p className='pt-3'>{apiMag}</p> : null }
                  <p>Don't Have Account ? <Link className="dec-none" to={'/register'}>Register Now</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import axios from "axios";
import { useRecoilState } from "recoil";
import { noteState } from "../Atoms/notesAtoms";
import Note from "../Note/Note";


export default function Home() {

  
  let [notesState , setNotesState] = useRecoilState(noteState)

  const [show, setShow] = useState(false);
  let [allNotes , setAllNotes] = useState([])
  let [apiMag, setApiMag] = useState()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let headers = {
    token: `3b8ny__${localStorage.getItem('userToken')}` 
  }

  async function addNote (values){
    let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/notes' ,values ,{
      headers }
    )
    .catch((err)=> {
      setApiMag(err.response.data.msg);
    })
    .finally(()=> {
      handleClose()
    })
    console.log(data);
    getNotes()
  }

  async function getNotes(){
    let {data} = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes' , {headers})
    console.log(data);
    setNotesState(data.notes.length)
    setAllNotes(data.notes)
  }

  let formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },onSubmit: addNote
  })

  useEffect(()=>{
    getNotes()
  },[])

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              onChange={formik.handleChange}
              className="form-control my-3"
              type="text"
              name="title"
              id="title"
              placeholder="Enter The title"
            />

            <textarea
              onChange={formik.handleChange}
              className="form-control my-3"
              type="text"
              name="content"
              id="content"
              placeholder="Enter the content"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{backgroundColor:"#0DCAF0"}} className='w-100 p-2 text-white text-center fixed-top '>Notes App : {notesState} </div>
      
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2">
              <button className="btn btn-info text-white" variant="primary" onClick={handleShow}>
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            {apiMag? <div className="alert alert-danger p-2 mb-0 mt-2">{apiMag}</div> : null}
            
            <div className="row ">
              {allNotes.map((note)=> {
                return  <Note key={note._id} note={note} getNotes={getNotes}/>
              })}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

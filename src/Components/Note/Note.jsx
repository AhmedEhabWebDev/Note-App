import React, { useState } from "react";
import "./Note.scss";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { Slide } from "react-awesome-reveal";

export default function Note({note , getNotes}) {

  const [show, setShow] = useState(false);
  let [apiMag, setApiMag] = useState()
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let headers = {
    token: `3b8ny__${localStorage.getItem('userToken')}` 
  }

  async function updateNote (values){
    let {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, values, {
      headers
    })
    .catch((err)=> {
      setApiMag(err.response.data.msg);
    })
    .finally(()=> {
      handleClose()
    })
    getNotes()
  }

  async function deleteNote (){
    let {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {
      headers
    })
    getNotes()
  }

  let formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },onSubmit : updateNote
  })

  return <>
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
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      {apiMag? <div className="alert alert-danger p-2 mb-0 mt-2">{apiMag}</div> : null}

      <div className="col-md-6 p-3">
        <Slide direction="up">
          <div>
          <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
        {note.content}
        </Card.Text>
            <i
              onClick={handleShow}
              variant="primary" 
              className="cursor-pointer fa-solid fa-pen-to-square text-success me-3 fa-2x "
            ></i>
            <i className="cursor-pointer fa-solid fa-trash text-danger fa-2x" onClick={deleteNote}></i>
          
      </Card.Body>
    </Card>
          </div>
        </Slide>
      </div>

      
    </>
}

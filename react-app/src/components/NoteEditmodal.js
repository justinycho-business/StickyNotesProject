import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './NoteEditmodal.module.css'

//styling for modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}
const NoteEditModal = (props) => {
    const [noteId, setnoteId] = useState(1)
    const [noteTitle, setnoteTitle] = useState("Title Goes Here")
    const [noteContent, setnoteContent] = useState("Content Goes Here")
    const [noteColor, setnoteColor] = useState("Color")



    return  <div className={classes.modal}>
        <div className={classes.header}>
            <h2>Edit Sticky Note</h2>
        </div>
        <div className={classes.form}>
            <p>Title:</p>
            <input
            type='text'
            value={noteTitle}
            onChange={(e) => setnoteTitle(e.target.value)}
            />
            <p>Content:</p>
            <textarea
            type='text'
            value={noteContent}
            onChange={(e) => setnoteContent(e.target.value)}
            />
            <p>Sticky Note Color:</p>
            <input
            type='text'
            value={noteColor}
            onChange={(e) => setnoteColor(e.target.value)}
            />
        </div>
        <div className={classes.actions}>
            <button>Save</button>
            <button onClick={props.onConfirm}>Cancel</button>
        </div>
    </div>
  }

const NoteEditModalFull = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
            <Backdrop onConfirm={props.onConfirm}/>,
            document.getElementById('overlay')
            )}
            {ReactDOM.createPortal(<NoteEditModal onConfirm={props.onConfirm}/>, document.getElementById('modal_location'))}
        </>
    )
}

export default  NoteEditModalFull

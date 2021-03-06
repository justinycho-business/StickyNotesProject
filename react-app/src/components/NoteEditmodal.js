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
    const [noteId, setnoteId] = useState(props.id)
    const [noteTitle, setnoteTitle] = useState(props.title)
    const [noteContent, setnoteContent] = useState(props.content)
    const [noteColor, setnoteColor] = useState(props.color)

    const save = () => {
        console.log(noteTitle, props.board_id);
        props.editNoteThunk(props.noteid,
                            props.board_id,
                            noteColor,
                            noteTitle,
                            noteContent)
        console.log('called editnote');
        props.onConfirm()

    }


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
            <button onClick={save}>Save</button>
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
            {ReactDOM.createPortal(<NoteEditModal
                                    onConfirm={props.onConfirm}
                                    noteid = {props.noteid}
                                    title = {props.title}
                                    content = {props.content}
                                    color = {props.color}
                                    board_id = {props.board_id}
                                    editNoteThunk={props.editNoteThunk}/>,
                                    document.getElementById('modal_location'))}
        </>
    )
}

export default  NoteEditModalFull

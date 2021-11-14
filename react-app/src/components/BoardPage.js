import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './BoardPage.module.css';
import {getAllBoard,
        getAllNotesThunk,
        positionNotesThunk,
        noteCreate} from '../store/boards';
import Draggable, {DraggableCore} from 'react-draggable'; // https://www.npmjs.com/package/react-draggable
import Note from './Notes';

function BoardPage() {
  const dispatch = useDispatch();
  const [boards, setBoards] = useState([]);
  const { boardid } = useParams();
  const user = useSelector(state => state?.session?.user);
  const boardsRedux = useSelector(state => state?.boards?.boards?.boards);
  const notesRedux = useSelector(state => state?.boards?.notes?.notes);


  // const showboard = boards === undefined ? boards.length > 0 : false
    const [numberofnotes, setNumberofNotes]= useState(0)


  useEffect(
    () => {
        let numbernotes;
        const req = dispatch(getAllNotesThunk(boardid));
        req.then(data => {
            console.log(data);
            numbernotes = data
        })


  }, [numberofnotes]);

  let notesJSX;
  const positiondispatch = (noteid, x, y) => {
    return dispatch(positionNotesThunk(noteid, x, y))
  }

  const createNote = () => {
      console.log("will dispatch notecreatethunk");

    return dispatch(noteCreate(boardid, numberofnotes, setNumberofNotes))
  }

  if (notesRedux && notesRedux.length > 0 ) {
    notesJSX = notesRedux.map((note) => {
      return (
        <div key={note.id}>
          <Note
            board_id = {note.board_id}
            color = {note.color}
            content = {note.content}
            id = {note.id}
            title = {note.title}
            x = {note.x}
            y = {note.y}
            position_dispatch = {positiondispatch}
          />
        </div>
      );
    });
  }


  return (
    <>
    <div className={classes.header}>
      <h1>Board Name</h1>
      </div>
      <div className={classes.whiteboardcontainer}>
        <div className={classes.notecanvas}>
            {notesRedux && notesRedux.length > 0 &&
                <>{notesJSX}</>}
        </div>
        <div className={classes.actionpanel}>
            <h3>Action Panel: </h3>
            <button onClick={createNote}>Add Sticky Note</button>
            <button>Add Image</button>
            <button>Draw On Board</button>
            <button>Clear Sticky Notes</button>
            <button>Clear Images</button>
            <button>Clear Board</button>


        </div>
      </div>

    </>
  );
}

export default BoardPage;

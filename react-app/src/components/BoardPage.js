import React, { useEffect, useState, Component } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './BoardPage.module.css';
import {getAllBoard,
        getAllNotesThunk,
        positionNotesThunk,
        positionImagesThunk,
        noteCreate,
        imageCreate,
        noteDelete,
        allnoteDelete,
        allimageDelete,
        imageDelete,
        noteEditThunk,
        imageEditThunk ,
        getAllImagesThunk } from '../store/boards';
import Draggable, {DraggableCore} from 'react-draggable'; // https://www.npmjs.com/package/react-draggable
import Note from './Notes';
import Image from './Images';
import Canvas from './reactdrawable';
import {Canvas1} from './Canvas'
import { ClearCanvasButton } from './ClearCanvasButton';

function BoardPage() {
  const dispatch = useDispatch();
  const [boards, setBoards] = useState([]);
  const { boardid } = useParams();
  const user = useSelector(state => state?.session?.user);
  const boardsRedux = useSelector(state => state?.boards?.boards?.boards);
  const notesRedux = useSelector(state => state?.boards?.notes?.notes);
  const imagesRedux = useSelector(state => state?.boards?.images?.images);


  // const showboard = boards === undefined ? boards.length > 0 : false
    const [numberofnotes, setNumberofNotes]= useState(0)
    const [numberofimages, setNumberofImages]= useState(0)


  useEffect(
    () => {
        let numbernotes;
        const req0 = dispatch(getAllBoard(1));
        const req = dispatch(getAllNotesThunk(boardid));
        req.then(data => {
            console.log(data);
            numbernotes = data
        })


  }, [numberofnotes]);

  useEffect(
    () => {
        let numberimages;
        const req = dispatch(getAllImagesThunk(boardid));
        req.then(data => {
            console.log(data);
            numberimages = data
        })


  }, [numberofimages]);

  let notesJSX;
  let imagesJSX;

  const positiondispatch = (noteid, x, y) => {
    return dispatch(positionNotesThunk(noteid, x, y))
  }

  const positionImageDispatch = (imageid, boardid, x, y) => {
      console.log("image reposition");
    return dispatch(positionImagesThunk(imageid, boardid, x, y))
  }

  const createNote = () => {
      console.log("will dispatch notecreatethunk");

    return dispatch(noteCreate(boardid, numberofnotes, setNumberofNotes))
  }

  const createImage = () => {
    console.log("will dispatch imagecreatethunk");

  return dispatch(imageCreate(boardid, numberofimages, setNumberofImages))
}

  const deleteNote = (noteid, boardid) => {
    console.log("will dispatch notedeletethunk");

  return dispatch(noteDelete(noteid, boardid, numberofnotes, setNumberofNotes))
}
const allnoteDeletefunction = (boardid) => {
    return dispatch(allnoteDelete(boardid, numberofnotes, setNumberofNotes))

}
const deleteImage = (imageid, boardid) => {
    console.log("will dispatch imagedeletethunk");

  return dispatch(imageDelete(imageid, boardid, numberofimages, setNumberofImages))
}

const allimageDeletefunction = (boardid) => {
    return dispatch(allimageDelete(boardid, numberofimages, setNumberofImages))
}
const editfunction = (noteid, boardid, color, title, content) => {
    return dispatch(noteEditThunk(
        noteid,
        boardid,
        color,
        title,
        content,
         numberofnotes,
         setNumberofNotes))
}
const editNoteThunk = (noteid, boardid, color, title, content) => {
    console.log("will dispatch noteeditthunk");

  return editfunction(noteid, boardid, color, title, content)
}

const imageeditfunction = (imageid, boardid, imageURL, title, width, height) => {
    return dispatch(imageEditThunk(imageid,
                                    boardid,
                                    imageURL,
                                    title,
                                    width,
                                    height,
                                    numberofimages,
                                    setNumberofImages

                                    ))
}




  if (imagesRedux && imagesRedux.length > 0 ) {
    imagesJSX = imagesRedux.map((image) => {
      return (
        <div key={`image-${image.id}`}>
          <Image
            board_id = {image.board_id}
            imageURL = {image.imageURL}
            id = {image.id}
            title = {image.title}
            x = {image.x}
            y = {image.y}
            width = {image.width}
            height = {image.height}
            position_dispatch = { positionImageDispatch}
            delete_image_thunk = {deleteImage}
            imageeditfunction = {imageeditfunction}

          />
        </div>
      );
    });
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
            deleteNote_dispatch = {deleteNote}
            numberofnotes = {numberofnotes}
            setNumberofNotes = {setNumberofNotes}
            editNoteThunk = {editNoteThunk}
          />
        </div>
      );
    });
  }


  return (
    <>
    <div className={classes.header}>
      <h1>{boardsRedux && boardsRedux.length > 0 && boardsRedux[boardid-1]['name']}</h1>
      </div>
      <div className={classes.whiteboardcontainer}>

        <div className={classes.notecanvas}>
             {/* {<Canvas1 notesJSX = {notesJSX} imagesJSX = {imagesJSX}/>} */}


            {notesRedux && notesRedux.length > 0 &&
                <>{notesJSX}</>}
            {imagesRedux && imagesRedux.length > 0  &&
                <>{imagesJSX}</>}

        </div>
        <div className={classes.actionpanel}>
            <h3>Action Panel: </h3>
            <button onClick={createNote}>Add Sticky Note</button>
            <button onClick= {createImage}>Add Image</button>
            {/* <button>Draw On Board</button> */}
            <button onClick= {() => {allnoteDeletefunction(boardid)}}>Clear Sticky Notes</button>
            <button onClick={() => {allimageDeletefunction(boardid)}}>Clear Images</button>
            {/* <button>Clear Board</button> */}


        </div>
      </div>

    </>
  );
}

export default BoardPage;

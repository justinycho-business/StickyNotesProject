import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './ImageEditmodal.module.css'

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
const ImageEditModal = (props) => {
    const [imageId, setimageId] = useState(props.imageid)
    const [imageTitle, setimageTitle] = useState(props.title)
    const [imageURL, setimageURL] = useState(props.imageURL)
    const [imageWidth, setimageWidth] = useState(props.width)
    const [imageHeight, setimageHeight] = useState(props.height)

    const save = () => {
        console.log('====', imageTitle, props.board_id);
        props.editImageThunk(
            props.imageid,
            props.board_id,
            imageURL,
            imageTitle,
            imageWidth,
            imageHeight,







        )

        props.onConfirm()

    }


    return  <div className={classes.modal}>
        <div className={classes.header}>
            <h2>Edit Image</h2>
        </div>
        <div className={classes.form}>
            <p>Title:</p>
            <input
            type='text'
            value={imageTitle}
            onChange={(e) => setimageTitle(e.target.value)}
            />
            <p>Image URL:</p>
            <textarea
            type='text'
            value={imageURL}
            onChange={(e) => setimageURL(e.target.value)}
            />
            <p>Image Width:</p>
            <input
            type='text'
            value={imageWidth}
            onChange={(e) => setimageWidth(e.target.value)}
            />
            <p>Image Height:</p>
            <input
            type='text'
            value={imageHeight}
            onChange={(e) => setimageHeight(e.target.value)}
            />
        </div>
        <div className={classes.actions}>
            <button
            onClick={save}
            >Save</button>
            <button onClick={props.onConfirm}>Cancel</button>
        </div>
    </div>
  }

const ImageEditModalFull = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
            <Backdrop onConfirm={props.onConfirm}/>,
            document.getElementById('overlay')
            )}
            {ReactDOM.createPortal(<ImageEditModal
                                    onConfirm={props.onConfirm}
                                    imageid = {props.imageid}
                                    title = {props.title}
                                    imageURL = {props.imageURL}
                                    width = {props.width}
                                    height = {props.height}
                                    board_id = {props.board_id}
                                    editImageThunk = {props.editImageThunk}


                                    />,
                                    document.getElementById('modal_location'))}
        </>
    )
}

export default  ImageEditModalFull

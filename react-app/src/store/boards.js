
// Define action types
const GET_ALL_BOARDS = 'board/GET_ALL_BOARDS'
const GET_ALL_NOTES = 'board/GET_ALL_NOTES'
const GET_ALL_IMAGES = 'board/GET_ALL_IMAGES'

const NOTES_POSITION = 'board/NOTES_POSITION';
const IMAGES_POSITION = 'board/IMAGES_POSITION';

const NOTE_CREATE = 'board/NOTES_POSITION';
const IMAGE_CREATE = 'board/IMAGES_POSITION';

const NOTE_DELETE = 'board/NOTES_DELETE';
const IMAGE_DELETE = 'board/IMAGE_DELETE';

const NOTE_EDIT = 'board/NOTES_EDIT';
const IMAGES_EDIT = 'board/IMAGES_EDIT';

const ALL_NOTES_DELETE = 'board/ALL_NOTES_DELETE';
const ALL_IMAGES_DELETE = 'board/ALL_IMAGES_DELETE';


// Action Creators
const getAllBoards = (boards) => ({
    type: GET_ALL_BOARDS,
    payload: boards
})

const getAllNotes = (notes) => ({
    type: GET_ALL_NOTES,
    payload: notes
})

const getAllImages = (images) => ({
    type: GET_ALL_IMAGES,
    payload: images
})

const noteEdit = (notes) => ({
    type: NOTE_EDIT,
    payload: notes
})

const imageEdit = (images) => ({
    type: IMAGES_EDIT,
    payload: images
})

const imagePosition = (images) => ({
    type: IMAGES_POSITION,
    payload: images
})

const notePosition = (notes) => ({
    type: NOTES_POSITION,
    payload: notes
})

const newNote = (notes) => ({
    type: NOTE_CREATE,
    payload: notes
})

const newImage = (images) => ({
    type: IMAGE_CREATE,
    payload: images
})

const deleteNote = (notes) => ({
    type: NOTE_DELETE,
    payload: notes
})

const deleteAllNote = (notes) => ({
    type: ALL_NOTES_DELETE,
    payload: notes
})

const deleteAllImage = (images) => ({
    type: ALL_IMAGES_DELETE,
    payload: images
})

const deleteImage = (images) => ({
    type: IMAGE_DELETE,
    payload: images
})

// Define Thunks
export const getAllBoard = (number) => async (dispatch) => {
    console.log("hi thunk")
    const response = await fetch(`/api/board/boards`)

    if(response.ok) {
        const boardData = await response.json();
        dispatch(getAllBoards(boardData));
}}

export const getAllNotesThunk = (boardid) => async (dispatch) => {

    const response = await fetch(`/api/board/notes/${boardid}`)

    if(response.ok) {
        const noteData = await response.json();
        dispatch(getAllNotes(noteData));
        return noteData['notes'].length
}}

export const getAllImagesThunk = (boardid) => async (dispatch) => {

    const response = await fetch(`/api/board/images/${boardid}`)

    if(response.ok) {
        const imageData = await response.json();
        dispatch(getAllImages(imageData));
        return imageData['images'].length
}}

export const positionNotesThunk = (noteid, x, y) => async (dispatch) => {
    console.log('positionthunk');
    const response = await fetch(`/api/board/notes/notepositionchange/${noteid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'noteid': noteid,
            'x': x,
            'y': y
                                   })
    })

    if(response.ok) {
        const noteData = await response.json();
        dispatch(notePosition(noteData));
}}

export const positionImagesThunk = (imageid, boardid, x, y) => async (dispatch) => {
    console.log('imagepositionthunk');
    const response = await fetch(`/api/board/images/imagepositionchange/${imageid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'imageid': imageid,
            'x': x,
            'y': y,
            'boardid': boardid
                                   })
    })

    if(response.ok) {
        const imageData = await response.json();
        dispatch(imagePosition(imageData));
}}

export const noteEditThunk = (noteid, boardid, color, title, content, numberofnotes,  setNumberofNotes) => async (dispatch) => {
    console.log('ditthunk');
    const response = await fetch(`/api/board/notes/noteedit/${noteid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'noteid': noteid,
            'board_id': boardid,
            'color': color,
            'title': title,
            'content': content
                                   })
    })

    if(response.ok) {
        const noteData = await response.json();
        dispatch(noteEdit(noteData));
}}

export const imageEditThunk = (imageid, boardid, imageURL, title, width, height, numberofimages, setNumberofImages) => async (dispatch) => {
    console.log('editimagethunk');
    const response = await fetch(`/api/board/images/imageedit/${imageid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'imageid': imageid,
            'board_id': boardid,
            'width': width,
            'height': height,
            'imageURL': imageURL,
            'title': title,
                                   })
    })

    if(response.ok) {
        console.log('line 187');
        const imagedata = await response.json();
        dispatch(imageEdit(imagedata));
        // setNumberofImages(numberofimages+1)
}}

export const noteCreate = (boardid, numberofnotes,  setNumberofNotes) => async (dispatch) => {
    console.log("createnotethunk");
    const response = await fetch(`/api/board/notes/notecreate/${boardid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'board_id': boardid,
                                   })
    })

    if(response.ok) {
        const noteData = await response.json();
        dispatch(newNote(noteData));
        setNumberofNotes(numberofnotes+1)

}}

export const imageCreate = (boardid, numberofimages, setNumberofImages) => async (dispatch) => {
    console.log("createimagethunk");
    const response = await fetch(`/api/board/images/imagecreate/${boardid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'board_id': boardid,
                                   })
    })

    if(response.ok) {
        const imageData = await response.json();
        dispatch(newImage(imageData));
        setNumberofImages(numberofimages+1)

}}

export const noteDelete = (noteid, boardid, numberofnotes,  setNumberofNotes) => async (dispatch) => {
    console.log("deletenotethunk");
    const response = await fetch(`/api/board/notes/notedelete/${noteid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'board_id': boardid,
                                   })
    })

    if(response.ok) {
        const noteData = await response.json();
        dispatch(deleteNote(noteData));
        setNumberofNotes(numberofnotes-1)

}}

export const allnoteDelete = (boardid, numberofnotes,  setNumberofNotes) => async (dispatch) => {
    console.log("deleteallnotethunk");
    const response = await fetch(`/api/board/notes/allnotedelete/${boardid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'board_id': boardid,
                                   })
    })

    if(response.ok) {
        const noteData = await response.json();
        dispatch(deleteAllNote(noteData));
        setNumberofNotes(numberofnotes-10)

}}

export const allimageDelete = (boardid, numberofimages, setNumberofImages) => async (dispatch) => {
    console.log("deleteallimagethunk");
    const response = await fetch(`/api/board/images/allimagesdelete/${boardid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'board_id': boardid,
                                   })
    })

    if(response.ok) {
        const imageData = await response.json();
        dispatch(deleteAllImage(imageData));
        setNumberofImages(numberofimages-10)

}}

export const imageDelete = (imageid, boardid, numberofimages, setNumberofImages) => async (dispatch) => {
    console.log("deleteimagethunk");
    const response = await fetch(`/api/board/images/imagedelete/${imageid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'board_id': boardid,
                                   })
    })

    if(response.ok) {
        const imageData = await response.json();
        dispatch(deleteImage(imageData));
        setNumberofImages(numberofimages-1)

}}


// Define initial state
const initialState = {}

  // Define reducer
export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOARDS:
            return {...state, boards: action.payload }
        case GET_ALL_NOTES:
            let notestate = {...state, notes: action.payload}
            // notestate = [action.payload['notes']['board_id']] = action.payload
            return notestate
        case NOTES_POSITION:
            return {...state, notes_repostion: action.payload }
        case NOTE_CREATE:
            let notestate1 = {...state, notes: action.payload}
            // notestate = [action.payload['notes']['board_id']] = action.payload
            return notestate1
        case IMAGE_CREATE:
            let imagestate1 = {...state, images: action.payload}
            return imagestate1
        case NOTE_DELETE:
            return {...state, notes: action.payload}
        case ALL_NOTES_DELETE:
            return {...state, notes: action.payload}
        case IMAGE_DELETE:
            return {...state, images: action.payload}
        case ALL_IMAGES_DELETE:
            return {...state, images: action.payload}
        case NOTE_EDIT:
            return {...state, notes: action.payload}
        case GET_ALL_IMAGES:
            let imagesstate = {...state, images: action.payload}
            return imagesstate
        case IMAGES_POSITION:
            return {...state, images: action.payload}
        case IMAGES_EDIT:
            return {...state, images: action.payload}
        default:
            return state;
    };
};


// Define action types
const GET_ALL_BOARDS = 'board/GET_ALL_BOARDS'
const GET_ALL_NOTES = 'board/GET_ALL_NOTES'
const NOTES_POSITION = 'board/NOTES_POSITION'
const NOTE_CREATE = 'board/NOTES_POSITION';
const NOTE_DELETE = 'board/NOTES_DELETE';
const NOTE_EDIT = 'board/NOTES_EDIT'

// Action Creators
const getAllBoards = (boards) => ({
    type: GET_ALL_BOARDS,
    payload: boards
})

const getAllNotes = (notes) => ({
    type: GET_ALL_NOTES,
    payload: notes
})

const noteEdit = (notes) => ({
    type: NOTE_EDIT,
    payload: notes
})

const notePosition = (notes) => ({
    type: NOTES_POSITION,
    payload: notes
})

const newNote = (notes) => ({
    type: NOTE_CREATE,
    payload: notes
})

const deleteNote = (notes) => ({
    type: NOTE_DELETE,
    payload: notes
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

export const noteCreate = (boardid, numberofnotes,  setNumberofNotes) => async (dispatch) => {
    console.log("createnotethunk");
    const response = await fetch(`/api/board//notes/notecreate/${boardid}`, {
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

export const noteDelete = (noteid, boardid, numberofnotes,  setNumberofNotes) => async (dispatch) => {
    console.log("deletenotethunk");
    const response = await fetch(`/api/board//notes/notedelete/${noteid}`, {
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
        case NOTE_DELETE:
            return {...state, notes: action.payload}
        case NOTE_EDIT:
            return {...state, notes: action.payload}
        default:
            return state;
    };
};


// Define action types
const GET_ALL_BOARDS = 'board/GET_ALL_BOARDS'


// Action Creators
const getAllBoards = (boards) => ({
    type: GET_ALL_BOARDS,
    payload: boards
})


// Define Thunks
export const getAllBoard = (number) => async (dispatch) => {
    console.log("hi thunk")
    const response = await fetch(`/api/board/boards`)

    if(response.ok) {
        const boardData = await response.json();
        dispatch(getAllBoards(boardData));
}}


// Define initial state
const initialState = {}

  // Define reducer
export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOARDS:
            return {...state, boards: action.payload }

        default:
            return state;
    };
};

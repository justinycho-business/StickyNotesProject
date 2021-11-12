import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Boards.module.css';
import {getAllBoard} from '../store/boards';

function Boards() {
  const dispatch = useDispatch();
  const [boards, setBoards] = useState([]);

  const user = useSelector(state => state?.session?.user);
  const boardsRedux = useSelector(state => state?.boards?.boards?.boards);

  // const showboard = boards === undefined ? boards.length > 0 : false

  useEffect(
    () => {
      console.log("hi")
      const req = dispatch(getAllBoard(1));

  }, []);

  const boardComponents = boardsRedux.map((board) => {
    return (
      <div key={board.id}>
        <NavLink to={`/board/${board.id}`}>{board.name}</NavLink>
      </div>
    );
  });

  return (
    <>
    <div className={classes.header}>
      <h1>Boards</h1>
      </div>
      { boardsRedux.length > 0 &&
      <div>{boardComponents}</div>}
    </>
  );
}

export default Boards;

import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { FaCog } from 'react-icons/fa'; // https://react-icons.github.io/react-icons/
import './Notes.css';
import NoteEditModalFull from './NoteEditmodal';

class Note extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            deltaPosition: {
                x: this.props.x,
                y: this.props.y
            },
            modalOpen: false
        }
    }

    eventLogger = (e, data) => {
      console.log('Event: ', e);
      console.log('Data: ', data);
    };

    handleDrag = (e, ui) => {
        // const eventLogger = (e, ui) => {
        //     console.log('Event: ', ui.deltaX);
        //     console.log('Data: ', ui.deltaY);
        //   };
        // eventLogger(e, ui)
        const { x, y } = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });

      };

    modalSwitch = () => {
        console.log("modalOpen or close");
        const currentstate = this.state.modalOpen
        this.setState({
            modalOpen: !currentstate
        })
    }

    handleStop = () =>{
    const newX = this.state.deltaPosition.x
    const newY = this.state.deltaPosition.y

    this.props.position_dispatch(this.props.id, newX, newY)
    }

    delete_Note = () => {
        this.props.deleteNote_dispatch(
            this.props.id,
            this.props.board_id)
    }

    editNoteThunk = (noteid, boardid, color, title, content) => {
        return this.props.editNoteThunk(noteid, boardid, color, title, content)
    }
    render() {
      return (
        <div className='outerdiv'>
        <Draggable
          handle=".handle"
          defaultPosition={{x: this.state.deltaPosition.x, y: this.state.deltaPosition.y}}
          position={null}
          grid={[25, 25]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          style={{ position: 'absolute', zIndex: '100' }}
          >
          <div className="note" style={{backgroundColor: this.props.color}}>
            <div className="containerheader">
                <div className="handle">
                <span>{this.props.title}</span>
                {/* <button onClick={this.modalSwitch}><FaCog/></button>
                {
                    this.state.modalOpen &&
                    <NoteEditModalFull onConfirm={this.modalSwitch} />
                } */}
                {/* <button>X</button> */}
                </div>
                <div>
                <button onClick={this.modalSwitch}><FaCog/></button>
                {
                    this.state.modalOpen &&
                    <NoteEditModalFull
                    noteid = {this.props.id}
                    onConfirm={this.modalSwitch}
                    title = {this.props.title}
                    board_id = {this.props.board_id}
                    content = {this.props.content}
                    color = {this.props.color}
                    editNoteThunk = {this.editNoteThunk}
                    />
                }
                <button onClick={this.delete_Note}>X</button>
                </div>
            </div>

            <div>{this.props.content}</div>
          </div>
        </Draggable>
        </div>
      );
    }
  }

export default Note

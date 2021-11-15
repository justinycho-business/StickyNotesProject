import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { FaCog } from 'react-icons/fa'; // https://react-icons.github.io/react-icons/
import './Images.css';
import ImageEditModalFull from './ImageEditmodal';

class Image extends React.Component {

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

    deleteImage = () => {
        return this.props.delete_image_thunk(this.props.id, this.props.board_id)
    }
    handleStop = () =>{
    const newX = this.state.deltaPosition.x
    const newY = this.state.deltaPosition.y

    this.props.position_dispatch(this.props.id, this.props.board_id, newX, newY)
    }

    // delete_Note = () => {
    //     this.props.deleteNote_dispatch(
    //         this.props.id,
    //         this.props.board_id)
    // }

    editImageThunk = (imageid, boardid, imageURL, title, width, height) => {
        return this.props.imageeditfunction(imageid, boardid, imageURL, title, width, height)
    }

    render() {
      return (
        <Draggable
          handle=".handle"
          defaultPosition={{x: this.state.deltaPosition.x, y: this.state.deltaPosition.y}}
          position={null}
          grid={[25, 25]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>
          <div className="noteimage">
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
                    <ImageEditModalFull
                    imageid = {this.props.id}
                    onConfirm={this.modalSwitch}
                    title = {this.props.title}
                    board_id = {this.props.board_id}
                    imageURL = {this.props.imageURL}
                    width = {this.props.width}
                    height = {this.props.height}
                    editImageThunk = {this.editImageThunk}

                    />
                }
                <button onClick = {this.deleteImage}>X</button>
                </div>
            </div>

            <img src={this.props.imageURL} style={{'height': this.props.height, "width": this.props.width}}/>
          </div>
        </Draggable>
      );
    }
  }

export default Image

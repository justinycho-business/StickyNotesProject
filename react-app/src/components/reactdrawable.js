import React from 'react';
import DrawableCanvas from 'react-drawable-canvas'

class Canvas extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            brushColor: '#000000',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#00FFDC'
                    },
            clear: false
    }
        }

    handleOnClickChangeColorBlack = () =>{
        this.setState({
          brushColor: '#000000',
          clear: false
        });
      }

    handleOnClickChangeColorWhite= () => {
        this.setState({
          brushColor: '#800909',
          clear: true
        });
      }

 render() {
   return (
     <div>
       <DrawableCanvas />
       <button onClick={this.handleOnClickChangeColorWhite}>Eraser</button>
       <button onClick={this.handleOnClickChangeColorBlack}>Pen</button>
     </div>
   );
 }
};

export default Canvas;

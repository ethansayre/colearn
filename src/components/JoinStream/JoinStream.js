import React from 'react';
import Konva from "konva";
import { Stage, Layer, Line, Text, Image } from "react-konva";
import { TwitterPicker } from 'react-color';
import firebase from 'firebase';

class URLImage extends React.Component {
    state = {
      image: null
    };
    componentDidMount() {
      this.loadImage();
    }
    componentDidUpdate(oldProps) {
      if (oldProps.src !== this.props.src) {
        this.loadImage();
      }
    }
    componentWillUnmount() {
      this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
      // save to "this" to remove "load" handler on unmount
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.setState({
        image: this.image
      });
      // if you keep same image object during source updates
      // you will have to update layer manually:
      // this.imageNode.getLayer().batchDraw();
    };
    render() {
      return (
        <Image
          x={this.props.x}
          y={this.props.y}
          image={this.state.image}
          draggable={false}
          ref={node => {
            this.imageNode = node;
          }}
        />
      );
    }
  }

class Construction extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        lines: [],
        highlights: [],
        isActive: 0,
        lastActive: 0,
        displayColorPicker: false,
        image: ["https://api.twilio.com/2010-04-01/Accounts/AC5b1e363657c1b51dbf80880f5abf5079/Messages/MM960070a277e3db2e093ce7aaafa02977/Media/MEcc46b1191c302a1d074552a7b21076d9"]
    };

    componentDidMount = () => {
        firebase.database().ref('streams/main').on("value", (snapshot) => {
            if (snapshot.val() != null) {
                this.setState({lines: snapshot.val().lines});
            } else {
                this.setState({lines: []});
            };
        });
        firebase.database().ref('streams/main/image').on("value", (snapshot) => {
            if (snapshot.val() != null) {
                this.setState({image: snapshot.val()});
            } else {
                this.setState({image: []});
            };
        });
    }

    handleMouseDown = () => {
        this._drawing = true;
        // add line
        this.setState({
            lines: [...this.state.lines, {lines: [], type: this.state.isActive}]
            // lines: [...this.state.lines, []]
        });
    };
    
    handleMouseMove = e => {
        // no drawing - skipping
        if (!this._drawing) {
            return;
        }
        const stage = this.stageRef.getStage();
        const pointerPosition = stage.getPointerPosition();
        var stageAttrs = stage.attrs;
        var point = stage.getPointerPosition();
        if (stageAttrs.x != undefined) {
            point = {x: (pointerPosition.x - stageAttrs.x) / stageAttrs.scaleX, y: (pointerPosition.y - stageAttrs.y) / stageAttrs.scaleY};
        }
        const topLines = this.state.lines;
        const isActive = this.state.isActive;

        let lastLine = topLines[topLines.length - 1].lines;
        // add point
        lastLine = lastLine.concat([point.x, point.y]);

        // replace last
        topLines.splice(topLines.length - 1, 1, {lines: lastLine, type: isActive});
        this.setState({
            lines: topLines
        }, () => {
            //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
            firebase.database().ref('streams/main/lines').set(this.state.lines);
        });
    };
    
    handleMouseUp = () => {
        this._drawing = false;
    };

    undo = () => {
        console.log(this.state.lines);
        var array = this.state.lines;
        if (array.length > 0) {
            array.pop();
            this.setState({lines: array}, () => {
                //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
                firebase.database().ref('streams/main/lines').set(this.state.lines);
            });
        }
    }

    trash = () => {
        this.setState({lines: [], highlights: []}, () => {
            //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
            firebase.database().ref('streams/main/lines').set(this.state.lines);
        });
    }
    
    changeActive = (tool) => {
        this.setState({isActive: tool}, () => {
            //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
            firebase.database().ref('streams/main/lines').set(this.state.lines);
        });
    }

    render() {
        // lets think you want to make all your objects visible in
    // 700x700 scene
    const CANVAS_VIRTUAL_WIDTH = 1280;
    const CANVAS_VIRTUAL_HEIGHT = 720;

    // now you may want to make it visible even on small screens
    // we can just scale it
    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT
    );
        return(
            <div class="section">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Stream</p>
                    </div>
                    <div class="card-content">
                        <a style={{marginRight: 10}} class={`button is-primary is-rounded ${this.state.isActive == 0 ? "" : "is-light"}`} onClick={() => {this.changeActive(0)}}>
                            <span class="icon is-small">
                            <i class="fas fa-mouse-pointer"></i>
                            </span>
                        </a>
                        <a style={{marginRight: 10}} class={`button is-primary is-rounded ${this.state.isActive == -1 ? "" : "is-light"}`} onClick={() => {this.changeActive(-1)}}>
                            <span class="icon is-small">
                            <i class="fas fa-hand-paper"></i>
                            </span>
                        </a>
                        <a style={{marginRight: 10}} class={`button is-primary is-rounded ${this.state.isActive == 1 ? "" : "is-light"}`} onClick={() => {this.changeActive(1)}}>
                            <span class="icon is-small">
                            <i class="fas fa-pen"></i>
                            </span>
                        </a>
                        <a style={{marginRight: 10}} class={`button is-primary is-rounded ${this.state.isActive == 2 ? "" : "is-light"}`} onClick={() => {this.changeActive(2)}}>
                            <span class="icon is-small">
                                <i class="fas fa-highlighter"></i>
                            </span>
                        </a>
                        <a style={{marginRight: 10}} class={`button is-primary is-rounded is-light`} onClick={() => {this.undo()}}>
                            <span class="icon is-small">
                            <i class="fas fa-undo"></i>
                            </span>
                        </a>
                        <a style={{marginRight: 10}} class={`button is-primary is-rounded is-light`} onClick={() => {this.trash()}}>
                            <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                            </span>
                            { this.state.displayColorPicker ? <div style={{position: 'absolute'}}>
                            <div style={{position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',}} onClick={ this.handleClose }/>
                            <TwitterPicker />
                            </div> : null }
                        </a>
                        <Stage
                            width={window.innerWidth} height={window.innerHeight} scaleX={scale} scaleY={scale}
                            x={1}
                            y={1}
                            style={{paddingTop: 5}}
                            onContentMousedown={this.state.isActive <= 0 ? null : this.handleMouseDown}
                            onContentMousemove={this.state.isActive <= 0 ? null : this.handleMouseMove}
                            onContentMouseup={this.state.isActive <= 0 ? null : this.handleMouseUp}
                            onContentTouchstart={this.state.isActive <= 0 ? null : this.handleMouseDown}
                            onContentTouchmove={this.state.isActive <= 0 ? null : this.handleMouseMove}
                            onContentTouchend={this.state.isActive <= 0 ? null : this.handleMouseUp}
                            draggable={this.state.isActive == -1 ? true : null}
                            ref={node => {
                            this.stageRef = node;
                            }}
                        >
                            <Layer>
                            {this.state.image.map((image, i) => (
                                <URLImage
                                x={20}
                                y={20}
                                src={image}
                                />
                            ))}
                            {this.state.lines.map((line, i) => (
                                <Line
                                key={i}
                                strokeWidth={line.type == 2 ? 15 : 3.5}
                                opacity={line.type == 2 ? 0.2 : 1}
                                lineJoin="round"
                                lineCap={line.type == 2 ? "square" : "round"}
                                points={line.lines}
                                stroke="red"
                                draggable={this.state.isActive == 0 ? true : false}
                                shadowForStrokeEnabled={true}
                                />
                            ))}
                            </Layer>
                        </Stage>
                    </div>
                </div>
            </div>
        )
    }
};

export default Construction;
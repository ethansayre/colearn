import React from 'react';
import Konva from "konva";
import { Stage, Layer, Line, Text } from "react-konva";

class Construction extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        lines: [],
        highlights: [],
        isActive: 0,
        lastActive: 0
    };

    handleMouseDown = () => {
        this._drawing = true;
        // add line
        if (this.state.isActive == 1) {
            this.setState({
                lines: [...this.state.lines, []]
            });
        } else if (this.state.isActive == 2) {
            this.setState({
                highlights: [...this.state.highlights, []]
            });
        }
    };
    
    handleMouseMove = e => {
        // no drawing - skipping
        if (!this._drawing) {
            return;
        }
        const stage = this.stageRef.getStage();
        const point = stage.getPointerPosition();
        if (this.state.isActive == 1) {
            const { lines } = this.state;

            let lastLine = lines[lines.length - 1];
            // add point
            lastLine = lastLine.concat([point.x, point.y]);

            // replace last
            lines.splice(lines.length - 1, 1, lastLine);
            this.setState({
                lines: lines.concat()
            });
        } else if (this.state.isActive == 2) {
            const { highlights } = this.state;

            let lastLine = highlights[highlights.length - 1];
            // add point
            lastLine = lastLine.concat([point.x, point.y]);

            // replace last
            highlights.splice(highlights.length - 1, 1, lastLine);
            this.setState({
                highlights: highlights.concat()
            });
        }
        
    };
    
    handleMouseUp = () => {
        this._drawing = false;
    };

    undo = () => {
        if (this.state.lastActive == 1) {
            var array = [...this.state.lines];
            if (!(array.length <= 0)) {
                array.pop();
                this.setState({lines: array});
            }
        } else if (this.state.lastActive == 2) {
            var array = [...this.state.highlights];
            if (!(array.length <= 0)) {
                array.pop();
                this.setState({highlights: array});
            }
        }
    }

    trash = () => {
        this.setState({lines: [], highlights: []});
    }
    
    changeActive = (tool) => {
        if (tool != 0) {
            const lastActive = this.state.isActive;
            this.setState({isActive: tool, lastActive: lastActive});
            console.log(this.state.isActive + " " + this.state.lastActive)
        } else {
            this.setState({isActive: tool});
            console.log(this.state.isActive + " " + this.state.lastActive)
        }
    }

    render() {
        return(
            <div class="section">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Stream</p>
                    </div>
                    <div class="card-content">
                        <a style={{marginRight: 10}} class={`button is-primary is-rounded ${this.state.isActive == 0 ? "" : "is-light"}`} onClick={() => {this.changeActive(0)}}>
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
                        </a>
                        <Stage
                            width={window.innerWidth}
                            height={window.innerHeight}
                            onContentMousedown={this.state.isActive == 0 ? null : this.handleMouseDown}
                            onContentMousemove={this.state.isActive == 0 ? null : this.handleMouseMove}
                            onContentMouseup={this.state.isActive == 0 ? null : this.handleMouseUp}
                            ref={node => {
                            this.stageRef = node;
                            }}
                        >
                            <Layer>
                            {this.state.lines.map((line, i) => (
                                <Line
                                key={i}
                                strokeWidth={3.5}
                                // opacity={0.2}
                                lineJoin="round"
                                lineCap="round"
                                points={line}
                                stroke="red"
                                draggable={this.state.isActive == 0 ? true : false}
                                shadowForStrokeEnabled={true}
                                />
                            ))}
                            {this.state.highlights.map((line, i) => (
                                <Line
                                key={i}
                                strokeWidth={15}
                                opacity={0.2}
                                lineJoin="round"
                                lineCap="square"
                                points={line}
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
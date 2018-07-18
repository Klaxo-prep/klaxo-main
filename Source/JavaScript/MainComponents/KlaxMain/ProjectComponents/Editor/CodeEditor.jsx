import React, { Component } from 'react';
import {LineNumbers} from "./LineNumbers";
import {Line} from "./Line";
import {Logger} from "../../../../Functional/Logger";

export default class CodeEditor extends Component {
    static LINE_SEPARATOR = "\n";

    state = {
        lines: [
            {
                content: "",
                focus: true,
                caretPos: 0,
                caretUpdated: false
            }
        ]
    };

    caretPositionHandler = [];
    caretPositionGetter = [];

    handlers = {
        enterNewLineAfter: (index, partialContent, pos, newLineCaretPos = 0, onComplete = null) => {
            this.setState(prevState => {
                const newState = prevState;

                newState.lines[index].content = newState.lines[index].content.slice(0,pos);
                newState.lines.splice((index + 1), 0, {
                    content: partialContent,
                    caretPos: newLineCaretPos,
                    caretUpdated: false
                });

                return newState;
            }, () => {
                if(onComplete) {
                    onComplete();
                } else {
                    this.handlers.setFocusOn(index + 1);
                }
            });
        },

        changeContent: (index, toSetPos, content) => {
            this.setState(prevState => {
                const newState = prevState;
                newState.lines[index].content = content;

                return newState;
            }, () => {
                this.caretPositionHandler[index](toSetPos);
                this.handlers.setFocusOn(index);
            });
        },

        insertContent: (index, pos, content) => {
            this.setState(prevState => {
                const newState = prevState;
                const previousContent = newState.lines[index].content;
                newState.lines[index].content = `${previousContent.slice(0, pos)}${content}${previousContent.slice(pos, previousContent.leaveDelay)}`;

                return newState;
            }, () => {
                this.caretPositionHandler[index](pos + content.length);
                this.handlers.setFocusOn(index);
            });
        },

        moveToLine: (index, pos, graciousFallBackPos = true) => {
            this.setState(prevState => {
                const newState = prevState;
                const contentLength = newState.lines[index].content.length;
                this.handlers.setFocusOn(index);

                if(graciousFallBackPos) {
                    newState.lines[index].caretPos = pos > contentLength ? contentLength : pos;
                } else {
                    newState.lines[index].caretPos = pos;
                }

                newState.lines[index].caretUpdated = false;

                return newState;
            });
        },

        getLineCount: () => this.state.lines.length,

        getLine: index => this.state.lines[index],

        setCaretPositionHandler: (handler, index) => this.caretPositionHandler[index] = handler,

        setCaretPositionGetter: (handler, index) => this.caretPositionGetter[index] = handler,

        setFocusOn: (index, setCaretPos = false, caretPos = null) =>  {
            this.setState(prevState => {
                const newState = prevState;

                newState.lines = newState.lines.map((l, key) => {
                    if(index === key) {
                        return {
                            ...prevState.lines[key],
                            caretPos: setCaretPos ? caretPos : prevState.lines[key].caretPos,
                            caretUpdated: setCaretPos ? false : prevState.lines[key].caretUpdated,
                            content: l.content,
                            focus: true
                        };
                    }
                    return {
                        ...prevState.lines[key],
                        content: l.content,
                        focus: false
                    };
                });

                return newState;
            });
        },

        setCaretUpdated: index => this.setState(prevState => {
            const newState = prevState;
            newState.lines[index].caretUpdated = true;

            return newState;
        }),

        removeLine: (index) => {
            this.state.lines.splice(index, 1);
        },

        saveInstruction: (key) => {
            const contentJoined = this.state.lines.map(line => line.content).join(CodeEditor.LINE_SEPARATOR);

            const fs = window.require('fs');
            fs.writeFile(this.props.path, contentJoined, err => {
                if(err) console.error(err);
            });

            this.props.logger.log({
                status: `Saved file to path ${this.props.path} due to ${key}`,
                tag: 'editor',
                level: Logger.VERBOSE
            });
        }
    };

    componentDidUpdate(prevProps) {
        if(prevProps.content !== this.props.content) {
            this.setLinesFromContent();
        }
    }

    setLinesFromContent() {
        const lines = this.props.content.split(CodeEditor.LINE_SEPARATOR);

        this.setState({
            lines: lines.map((line, index) => {
                const lineData = {
                    focus: false,
                    caretPos: 0,
                    caretUpdated: false,
                    content: line
                };
                if(index === 0) {
                    lineData.focus = true;
                }

                return lineData;
            })
        });
    }

    componentDidMount() {
        this.props.logger.log({
            tag: 'startup',
            status: 'Initialized code editor',
            level: Logger.VERBOSE
        });

        this.setLinesFromContent();
    }

    render() {
        return (
            <main className="code-editor">
                <LineNumbers lines={this.state.lines.length} />
                <section className="edit-live-container">
                    {
                        this.state.lines.map((line, key) => (
                            <Line
                                // this has project config and logger
                                logger={this.props.logger}
                                handlers={this.handlers}
                                key={key}
                                index={key}
                                content={line.content}
                                focus={line.focus}
                                caretPos={line.caretPos}
                                caretUpdated={line.caretUpdated}
                            />
                        ))
                    }
                </section>
            </main>
        );
    }
}
import React, { Component } from 'react';
import {LineNumbers} from "./LineNumbers";
import {Line} from "./Line";

export default class CodeEditor extends Component {
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
        enterNewLineAfter: (index, partialContent, pos, newLineCaretPos = 0) => {
            this.setState(prevState => {
                const newState = prevState;

                newState.lines[index].content = newState.lines[index].content.slice(0,pos);
                newState.lines.splice((index + 1), 0, {
                    content: partialContent,
                    caretPos: newLineCaretPos,
                    caretUpdated: false
                });

                return newState;
            }, () => this.handlers.setFocusOn(index + 1));
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
        },

        setCaretPositionHandler: (handler, index) => this.caretPositionHandler[index] = handler,

        setCaretPositionGetter: (handler, index) => this.caretPositionGetter[index] = handler,

        setFocusOn: (index) =>  {
            this.setState(prevState => {
                const newState = prevState;
                newState.lines = newState.lines.map((l, key) => {
                    if(index === key) {
                        return {
                            ...prevState.lines[key],
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
        })
    };

    render() {
        return (
            <main className="code-editor">
                <LineNumbers lines={this.state.lines.length} />
                <section className="edit-live-container">
                    {
                        this.state.lines.map((line, key) => (
                            <Line
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
        )
    }
}
import React, { Component } from 'react';
import {LineNumbers} from "./LineNumbers";
import {Line} from "./Line";

export default class CodeEditor extends Component {
    state = {
        lines: [
            {
                content: ""
            }
        ]
    };
    caretPositionHandler = [];

    handlers = {
        enterNewLineAfter: (index, partialContent) => {
            this.setState(prevState => {
                const newState = prevState;
                newState.lines.splice(index, 0, {
                    content: partialContent
                });
                console.log(newState);

                return newState;
            });
        },
        changeContent: (index, content) => {
            this.setState(prevState => {
                const newState = prevState;
                newState.lines[index].content = content;

                return newState;
            }, this.caretPositionHandler[index](this.state.lines[index].content.length));
        },
        setCaretPositionHandler: (handler, index) => this.caretPositionHandler[index] = handler
    };

    render() {
        return (
            <main className="code-editor">
                <LineNumbers lines={this.state.lines.length} />
                <section className="edit-live-container">
                    {
                        this.state.lines.map((line, key) => (
                            <Line handlers={this.handlers} key={key} index={key} content={line.content} />
                        ))
                    }
                </section>
            </main>
        )
    }
}
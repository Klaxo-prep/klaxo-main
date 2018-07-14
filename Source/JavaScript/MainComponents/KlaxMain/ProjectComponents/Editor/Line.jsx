import React, { Component } from 'react';

export class CaretUtility {
    static getCaretCharacterOffsetWithin(element) {
        let caretOffset = 0;
        let doc = element.ownerDocument || element.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel;
        if (typeof win.getSelection !== "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                let range = win.getSelection().getRangeAt(0);
                let preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type !== "Control") {
            let textRange = sel.createRange();
            let preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    static getCaretPosition() {
        if (window.getSelection && window.getSelection().getRangeAt) {
            let range = window.getSelection().getRangeAt(0);
            let selectedObj = window.getSelection();
            let rangeCount = 0;
            let childNodes = selectedObj.anchorNode.parentNode.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
                if (childNodes[i] === selectedObj.anchorNode) {
                    break;
                }
                if (childNodes[i].outerHTML)
                    rangeCount += childNodes[i].outerHTML.length;
                else if (childNodes[i].nodeType === 3) {
                    rangeCount += childNodes[i].textContent.length;
                }
            }
            return range.startOffset + rangeCount;
        }
        return -1;
    }

    static setCaretPosition(element, pos) {
        const range = document.createRange();
        const sel = window.getSelection();
        if(!(element.childNodes[0] instanceof Node)) {
            return;
        }
        if(element.childNodes[0].length < pos) {
            pos = element.childNodes[0].length;
        }
        range.setStart(element.childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

export class Line extends Component {
    static KEY_CODE_MAP = {
        "TAB": 9,
        "ENTER": 13,
        "SPACE": 32,
        "BACKSPACE": 8,
        "LEFT_ARROW": 37,
        "UP_ARROW": 38,
        "RIGHT_ARROW": 39,
        "DOWN_ARROW": 40
    };

    domElement = React.createRef();

    setCaretPosition = pos => {
        CaretUtility.setCaretPosition(this.domElement.current, pos);
    };

    getCaretPosition = () => CaretUtility.getCaretPosition(this.domElement.current);

    componentDidUpdate() {
        if(this.props.focus) {
            this.domElement.current.focus();
        }
        if(!this.props.caretUpdated) {
            console.log(this.props);
            this.setCaretPosition(this.props.caretPos);
            this.props.handlers.setCaretUpdated(this.props.index);
        }
    }

    componentDidMount() {
        this.props.handlers.setCaretPositionHandler(this.setCaretPosition, this.props.index);
        this.props.handlers.setCaretPositionGetter(this.getCaretPosition, this.props.index);

        this.setState({
            content: this.props.content
        });
        if(!this.props.caretUpdated) {
            this.setCaretPosition(this.props.caretPos);
            this.props.handlers.setCaretUpdated(this.props.index);
        }

        if(this.props.focus) {
            this.domElement.current.focus();
        }
    }

    getIndentation() {
        return this.domElement.current.childNodes[0] ? this.domElement.current.childNodes[0].textContent.search(/\S|$/) : 0;
    }

    handlers = {
        newLine: event => {
            const caretOffset = CaretUtility.getCaretCharacterOffsetWithin(this.domElement.current);
            const indentation = this.getIndentation();
            this.props.handlers.enterNewLineAfter(
                this.props.index,
                `${' '.repeat(indentation)}${this.props.content.substring(caretOffset)}`,
                caretOffset,
                indentation
            );
            event.preventDefault();
        },
        space: event => {
            // check for ctrl-button or some other stuff for more editor shortcuts thingies
            this.props.handlers.insertContent(
                this.props.index,
                this.getCaretPosition(),
                ' '
            );
            event.preventDefault();
        },
        backspace: event => {
            event.preventDefault();

            const caretPos = this.getCaretPosition();

            if(caretPos === 0) {
                return;
            }

            const removedContent = `${this.props.content.substr(0, caretPos - 1)}${this.props.content.substr(caretPos, this.props.content.length)}`;
            this.props.handlers.changeContent(
                this.props.index,
                caretPos - 1,
                `${removedContent}`
            );
        },
        arrowProcess: (direction, event) => {
            event.preventDefault();
            let currentCaretPos;
            switch (direction) {
                case 'left':
                    currentCaretPos = this.getCaretPosition();
                    if(currentCaretPos !== 0) {
                        this.setCaretPosition(currentCaretPos - 1);
                    }
                    break;
                case 'right':
                    currentCaretPos = this.getCaretPosition();
                    if(currentCaretPos !== this.props.content.length) {
                        this.setCaretPosition(currentCaretPos + 1);
                    } else if (currentCaretPos === this.props.content.leaveDelay) {
                        // Move to the first pos of the next line
                    }
                    break;
            }
        },
        tab: event => {
            event.preventDefault();

            this.props.handlers.insertContent(
                this.props.index,
                this.getCaretPosition(),
                '    '
            );
        }
    };

    ifTextualCharacter(keyCode, event) {
        if(
            (keyCode >= 48 && keyCode <= 90)
            || (keyCode >= 96 && keyCode <= 111)
            || (keyCode >= 160 && keyCode <= 176)
            || (keyCode >= 186 && keyCode <= 192)
            || (keyCode >= 219 && keyCode <= 222)
        ) {
            return event.key;
        } else {
            return null;
        }
    }

    useKeyLogic(keyCode, event) {
        event.stopPropagation();
        switch (keyCode) {
            case Line.KEY_CODE_MAP.ENTER:
                this.handlers.newLine(event);
                break;
            case Line.KEY_CODE_MAP.SPACE:
                this.handlers.space(event);
                break;
            case Line.KEY_CODE_MAP.BACKSPACE:
                this.handlers.backspace(event);
                break;
            case Line.KEY_CODE_MAP.LEFT_ARROW:
                this.handlers.arrowProcess('left', event);
                break;
            case Line.KEY_CODE_MAP.RIGHT_ARROW:
                this.handlers.arrowProcess('right', event);
                break;
            case Line.KEY_CODE_MAP.TAB:
                this.handlers.tab(event);
                break;
            default:
                const textualCharacter = this.ifTextualCharacter(keyCode, event);

                if(textualCharacter !== null) {
                    this.props.handlers.insertContent(
                        this.props.index,
                        this.getCaretPosition(),
                        `${textualCharacter}`
                    );
                }

                event.preventDefault();
                break;
        }
    }

    handleKeyPress = event => {
        event.persist();

        const keyCode = event.keyCode;
        this.useKeyLogic(keyCode, event);

        event.stopPropagation();
    };

    render() {
        return (
            <div
                className={`line ${this.props.focus ? 'focused' : ''}`}
                ref={this.domElement}
                contentEditable={true}
                onKeyDown={this.handleKeyPress}
                onClick={() => this.props.handlers.setFocusOn(this.props.index)}
            >
                { this.props.content }
            </div>
        );
    }
}
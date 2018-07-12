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
        range.setStart(element.childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

export class Line extends Component {
    static KEY_CODE_MAP = {
        "ENTER": 13
    };

    state = {
        content: null,
        updateContent: false
    };
    domElement = React.createRef();

    setCaretPosition = pos => {
        setTimeout(_ => CaretUtility.setCaretPosition(this.domElement.current, pos + 1), 10);
    };

    componentDidMount() {
        this.props.handlers.setCaretPositionHandler(this.setCaretPosition, this.props.index);
        this.setState({
            content: this.props.content
        });
    }

    handlers = {
        newLine: event => {
            const caretOffset = CaretUtility.getCaretCharacterOffsetWithin(this.domElement.current);
            this.props.handlers.enterNewLineAfter(this.props.index, this.state.content.substring(caretOffset));
        }
    };

    ifTextualCharacter(keyCode, event) {
        if((keyCode >= 48 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 160 && keyCode <= 176) || (keyCode >= 186 && keyCode <= 192)) {
            return event.key;
        } else {
            return null;
        }
    }

    useKeyLogic(keyCode, event) {
        switch (keyCode) {
            case Line.KEY_CODE_MAP.ENTER:
                this.handlers.newLine(event);
                event.preventDefault();
                break;
            default:
                const textualCharacter = this.ifTextualCharacter(keyCode, event);

                if(textualCharacter !== null) {
                    this.props.handlers.changeContent(
                        this.props.index,
                        `${this.props.content}${textualCharacter}`
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
            <div className="line" ref={this.domElement} contentEditable={true} onKeyDown={this.handleKeyPress}>
                { this.props.content }
            </div>
        );
    }
}
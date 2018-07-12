import React, { Component } from 'react';
import {Tab} from "./Tab";

export default class EditorTabs extends Component {
    render() {
        return (
            <nav className="editor-tabs">
                <Tab name="main.cpp" />
            </nav>
        );
    }
}
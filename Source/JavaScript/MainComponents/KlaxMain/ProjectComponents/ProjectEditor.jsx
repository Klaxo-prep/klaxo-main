import React, { Component } from 'react';
import EditorTabs from "./Tabs/EditorTabs";
import CodeEditor from "./Editor/CodeEditor";

export default class ProjectEditor extends Component {
    render() {
        return (
            <main className="project-editor">
                <EditorTabs />
                <CodeEditor />
            </main>
        );
    }
}
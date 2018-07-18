import React, { Component } from 'react';
import EditorTabs from "./Tabs/EditorTabs";
import CodeEditor from "./Editor/CodeEditor";
import {Logger} from "../../../Functional/Logger";
import {ProjectEditorPlaceholder} from "./ProjectEditorPlaceholder";
import Windows from "./Windows/Windows";
import {StatusBar} from "./StatusBar";

export default class ProjectEditor extends Component {
    state = {
        content: null,
        path: null
    };

    componentDidMount() {
        this.props.setOpenInEditor((path) => {
            const fs = window.require('fs');

            fs.readFile(path, {encoding: 'utf-8'}, (err,data) => {
                if (!err) {
                    this.setState({
                        content: data,
                        path: path
                    }, () => this.props.logger.log({
                        status: `Loaded path ${path} into the editor`,
                        tag: 'editor',
                        level: Logger.VERBOSE
                    }));
                }
            });
        });
    }

    render() {
        return (
            <main className="project-editor">
                {
                    this.state.content
                        ? (
                            <React.Fragment>
                                <EditorTabs temp_path={this.state.path.replace(/\\/g, '/')} />
                                <CodeEditor {...this.props} content={this.state.content} path={this.state.path} />
                                <Windows />
                                <StatusBar line={4} caretPos={2} />
                            </React.Fragment>
                        )
                        : <ProjectEditorPlaceholder />
                }
            </main>
        );
    }
}
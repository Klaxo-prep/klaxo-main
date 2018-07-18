import React, { Component } from 'react';
import {MaterialUITheme} from "../../../Configurations/MaterialUITheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import ProjectActionsHeader from "./ProjectActionsHeader";
import ProjectSidebar from "./Sidebar/ProjectSidebar";
import ProjectEditor from "./ProjectEditor";
import {Logger} from "../../../Functional/Logger";

export default class KlaxProject extends Component {
    state = {
        openInEditor: null
    };

    setOpenInEditor = opener => this.setState({
        openInEditor: opener
    });

    render() {
        return (
            <MuiThemeProvider theme={MaterialUITheme}>
                <ProjectActionsHeader {...this.props} />
                <main className="editor-main-space">
                    <ProjectSidebar {...this.props} openInEditor={this.state.openInEditor} />
                    <ProjectEditor {...this.props} setOpenInEditor={this.setOpenInEditor} />
                </main>
            </MuiThemeProvider>
        )
    }
}
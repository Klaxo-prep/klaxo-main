import React, { Component } from 'react';
import {MaterialUITheme} from "../../../Configurations/MaterialUITheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import ProjectActionsHeader from "./ProjectActionsHeader";
import ProjectSidebar from "./ProjectSidebar";
import ProjectEditor from "./ProjectEditor";

export default class KlaxProject extends Component {
    render() {
        return (
            <MuiThemeProvider theme={MaterialUITheme}>
                <ProjectActionsHeader {...this.props} />
                <main className="editor-main-space">
                    <ProjectSidebar {...this.props} />
                    <ProjectEditor {...this.props} />
                </main>
            </MuiThemeProvider>
        )
    }
}
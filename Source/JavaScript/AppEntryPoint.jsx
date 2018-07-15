import React, { Component } from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {MaterialUITheme} from "./Configurations/MaterialUITheme";
import SplashScreenProjectOverview from "./MainComponents/SplashScreen/SplashScreenProjectOverview";
import {CreateProject} from "./Functional/CreateProject";
import {GenericLogger} from "./Functional/Logger";
import {ProjectDataStore} from "./Functional/ProjectDataStore";
import KlaxEditor from "./MainComponents/KlaxMain/KlaxEditor";
const uuidv4 = window.require('uuid/v4');
window.require('electron-titlebar');

export default class AppEntryPoint extends Component {
    state = {
        codeEditorOpen: false,
        startupConfig: null,
        type: null
    };

    setupNewProject(projectConfig) {
        (new ProjectDataStore(projectConfig, this.logger))
            .store();

        (new CreateProject(projectConfig, this.logger))
            .createDirectory()
            .createBootstrapFiles();
    }

    openCodeEditor_NewProject = config => {
        const projectConfig = {
            ...config,
            uuid: uuidv4()
        };

        this.setupNewProject(projectConfig);

        this.setState({
            codeEditorOpen: true,
            startupConfig: projectConfig,
            type: 'project'
        });
    };

    openCodeEditor_Existing = project => {
        this.setState({
            codeEditorOpen: true,
            startupConfig: project,
            type: 'project'
        });
    };

    exitFromEditor = reason => {
        this.setState({
            codeEditorOpen: false,
            startupConfig: null,
            type: null
        });
    };

    componentDidMount() {
        import("../SCSS/splash.scss");
        this.logger = new GenericLogger();
    }

    render() {
        return (
            <MuiThemeProvider theme={MaterialUITheme}>
                {
                    this.state.codeEditorOpen
                        ? (
                            <KlaxEditor
                                logger={this.logger}
                                type={this.state.type}
                                config={this.state.startupConfig}
                                exitEditorHandler={this.exitFromEditor}
                            />
                        )
                        : (
                            <section className="splash-container">
                                <SplashScreenProjectOverview logger={this.logger} actions={ {
                                    completeAction: this.openCodeEditor_NewProject,
                                    openExistingProject: this.openCodeEditor_Existing
                                } } />
                            </section>
                        )
                }
            </MuiThemeProvider>
        )
    }
}
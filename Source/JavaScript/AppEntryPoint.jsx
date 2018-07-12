import React, { Component } from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {MaterialUITheme} from "./Configurations/MaterialUITheme";
import SplashScreenProjectOverview from "./MainComponents/SplashScreen/SplashScreenProjectOverview";
import {CreateProject} from "./Functional/CreateProject";
import {GenericLogger} from "./Functional/Logger";
import {ProjectDataStore} from "./Functional/ProjectDataStore";
const uuidv4 = window.require('uuid/v4');

export default class AppEntryPoint extends Component {
    state = {
        codeEditorOpen: false,
        startupConfig: null
    };

    openCodeEditor = config => {
        const projectConfig = {
            ...config,
            uuid: uuidv4()
        };

        const projectDataStore = (new ProjectDataStore(projectConfig, this.logger))
            .store();

        const projectCreator = (new CreateProject(projectConfig, this.logger))
            .createDirectory();

        this.setState({
            codeEditorOpen: true,
            startupConfig: projectConfig
        });
    };

    componentDidMount() {
        import("../SCSS/splash.scss");
        this.logger = new GenericLogger();
    }

    render() {
        return (
            <MuiThemeProvider theme={MaterialUITheme}>
                <section className="splash-container">
                    <SplashScreenProjectOverview logger={this.logger} actions={ {
                        completeAction: this.openCodeEditor
                    } } />
                </section>
            </MuiThemeProvider>
        )
    }
}
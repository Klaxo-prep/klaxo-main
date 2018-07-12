import React, { Component } from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {MaterialUITheme} from "../../Configurations/MaterialUITheme";
import Paper from "@material-ui/core/Paper";
import RecentsBar from "./RecentsBar";
import Actions from "./Actions";

export default class SplashScreenProjectOverview extends Component {
    render() {
        return (
            <MuiThemeProvider theme={MaterialUITheme}>
                <Paper elevation={24} className="overview">
                    <RecentsBar actions={this.props.actions} />
                    <Actions actions={this.props.actions} />
                </Paper>
            </MuiThemeProvider>
        )
    }
}
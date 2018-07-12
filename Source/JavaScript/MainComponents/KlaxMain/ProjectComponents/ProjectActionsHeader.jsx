import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";

export default class ProjectActionsHeader extends Component {
    render() {
        return (
            <Paper className="project-actions-header">
                <div className="project-name">
                    {
                        this.props.config.projectName
                    }
                </div>
            </Paper>
        );
    }
}
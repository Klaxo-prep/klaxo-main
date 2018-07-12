import React, { Component } from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {MaterialUITheme} from "../../Configurations/MaterialUITheme";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/FolderOpen';
import ListSubheader from '@material-ui/core/ListSubheader';
import {ProjectDataStore} from "../../Functional/ProjectDataStore";

export default class RecentsBar extends Component {
    projectDataStore = null;
    state = {
        projects: []
    };

    async componentDidMount() {
        this.projectDataStore = new ProjectDataStore(null, null);
        const projects = (JSON.parse(await this.projectDataStore.get()));

        this.setState({
            projects
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={MaterialUITheme}>
                <section className="recents-bar">
                    {
                        this.state.projects.length === 0
                            ? (
                                <div className="no-recents-info">
                                    No recently opened projects or files.
                                </div>
                            )
                            : (
                                <List>
                                    <ListSubheader>
                                        Recent projects and files
                                    </ListSubheader>
                                    {
                                        this.state.projects.map((project, key) => (
                                            <ListItem key={key} button={true}>
                                                <Avatar>
                                                    <FolderIcon />
                                                </Avatar>
                                                <ListItemText
                                                    primary={project.projectName}
                                                    secondary={
                                                        (new Date(project.time)).toLocaleString()
                                                    }
                                                />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            )
                    }
                </section>
            </MuiThemeProvider>
        )
    }
}
import React, { Component } from 'react';
import {MaterialUITheme} from "../../Configurations/MaterialUITheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {Icon} from "../../StaticComponents/Utils/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";

import AddBoxIcon from "@material-ui/icons/AddBox";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import NewProjectDialog from "./NewProjectDialog";

export default class Actions extends Component {
    state = {
        showProjectCreatorDialog: false
    };

    actions = [
        {
            icon: <CreateNewFolderIcon style={{ color: indigo[500] }} />,
            text: "Create new project",
            handler: _ => this.openProjectCreatorDialog(_)
        },
        {
            icon: <AddBoxIcon style={{ color: blue[500] }} />,
            text: "Open new file",
            handler: _ => {}
        },
        {
            icon: <FileIcon style={{ color: purple[500] }} />,
            text: "Open existing file",
            handler: _ => {}
        }
    ];

    closeNewProjectDialog = event => this.setState({
        showProjectCreatorDialog: false
    });

    openProjectCreatorDialog = event => this.setState({
        showProjectCreatorDialog: true
    });

    createProject = (projectName, directory) => {
        // Set up for a new view.
        this.closeNewProjectDialog(null);
        this.props.actions.completeAction({
            newProject: true,
            projectName,
            dir: directory
        });
    };

    render() {
        return (
            <MuiThemeProvider theme={MaterialUITheme}>
                <section className="actions-container">
                    <NewProjectDialog
                        open={this.state.showProjectCreatorDialog}
                        close={this.closeNewProjectDialog}
                        done={this.createProject}
                    />
                    <main className="content">
                        <Icon size={90} />
                        <br />
                        Klaxo - An open source C++ editor
                        <br />
                        <List className="action-list">
                            {
                                this.actions.map((item, key) => (
                                    <ListItem key={key} button={true} onClick={item.handler}>
                                        <ListItemIcon>
                                            { item.icon }
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </main>
                </section>
            </MuiThemeProvider>
        )
    }
}
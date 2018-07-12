import React, { Component } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";

export default class ProjectSidebar extends Component {
    render() {
        return (
            <aside className="project-sidebar">
                <List>
                    <ListSubheader>Explorer</ListSubheader>
                    <ListItem dense={true} button={true}>
                        <ListItemText primary="main.cpp"/>
                    </ListItem>
                </List>
            </aside>
        );
    }
}
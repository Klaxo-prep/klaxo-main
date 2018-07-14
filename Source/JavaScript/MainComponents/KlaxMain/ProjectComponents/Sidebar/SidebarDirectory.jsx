import React, { Component } from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import blue from '@material-ui/core/colors/blue';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ProjectSidebar from "./ProjectSidebar";

export class SidebarDirectory extends Component{
    state = {
        expanded: false
    };

    toggleExpand = (event) => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    };

    render() {
        return (
            <React.Fragment>
                <ListItem style={{ ...this.props.style, paddingLeft: this.props.nest === 0 ? '12px' : this.props.style.paddingLeft }} dense={true} button={true} onClick={this.toggleExpand}>
                    <ListItemIcon>
                        <FolderIcon style={{ fontSize: '15px', color: blue[300], marginRight: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary={this.props.name} />
                </ListItem>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            this.props.children.map((node, key) => ProjectSidebar.analyzeNode(node, key, this.props.nest + 1, true))
                        }
                    </List>
                </Collapse>
            </React.Fragment>
        );
    }
}
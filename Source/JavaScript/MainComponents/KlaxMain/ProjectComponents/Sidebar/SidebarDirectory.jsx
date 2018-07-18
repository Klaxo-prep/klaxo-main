import React, { Component } from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import blue from '@material-ui/core/colors/blue';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import ProjectSidebar from "./ProjectSidebar";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class SidebarDirectory extends Component{
    state = {
        expanded: false,
        showMenu: false,
        anchorEl: null,
        showNewFileDialog: false,
        showNewDirDialog: false,
        toCreateFileName: ''
    };

    toggleExpand = (event) => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    };

    openMenu = event => {
        event.persist();

        this.setState({
            showMenu: true,
            anchorEl: event.currentTarget
        });

        event.preventDefault();
        event.stopPropagation();
    };

    closeMenu = event => this.setState({
        showMenu: false,
        anchorEl: null
    });

    startNewFileProcess = event => {
        this.closeMenu();

        this.setState({
            showNewFileDialog: true
        });
    };

    startNewDirProcess = event => {
        this.closeMenu();

        this.setState({
            showNewDirDialog: true
        });
    };

    closeFileDialog = _ => this.setState({
        showNewFileDialog: false
    });

    closeDirDialog = _ => this.setState({
        showNewDirDialog: false
    });

    changeToCreateFileName = ev => this.setState({
        toCreateFileName: ev.target.value
    });

    createFile = ev => {
        this.closeFileDialog();

        const fs = window.require('fs');

        fs.writeFile(`${this.props.path}/${this.state.toCreateFileName}`, '// Start writing your code here...', err => {
            if(err) {
                console.error(err);
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <ListItem
                    style={{ ...this.props.style, paddingLeft: this.props.nest === 0 ? '12px' : this.props.style.paddingLeft }}
                    dense={true}
                    button={true}
                    onClick={this.toggleExpand}
                    onContextMenu={this.openMenu}
                >
                    <ListItemIcon>
                        <FolderIcon style={{ fontSize: '15px', color: blue[300], marginRight: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary={this.props.name} />
                </ListItem>

                <Dialog
                    open={this.state.showNewFileDialog}
                    onClose={this.closeFileDialog}
                >
                    <DialogTitle>Create new file</DialogTitle>
                    <DialogContent style={{ width: '350px' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="File name"
                            type="text"
                            fullWidth
                            onChange={this.changeToCreateFileName}
                            value={this.state.toCreateFileName}
                            onKeyDown={ ev => ev.keyCode === 13 ? this.createFile(ev) : null }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeFileDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.createFile} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.showNewDirDialog}
                    onClose={this.closeDirDialog}
                >
                    <DialogTitle>Create new directory</DialogTitle>
                    <DialogContent style={{ width: '350px' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Directory name"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDirDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.closeDirDialog} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                <Menu open={this.state.showMenu} anchorEl={this.state.anchorEl} onClose={this.closeMenu}>
                    <MenuItem className="context-menu" onClick={this.startNewFileProcess}>
                        New File
                    </MenuItem>
                    <MenuItem className="context-menu" onClick={this.startNewDirProcess}>
                        New Directory
                    </MenuItem>
                </Menu>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            this.props.children.map((node, key) => ProjectSidebar.analyzeNode(node, key, this.props.nest + 1, this.props.fileHandlers, true))
                        }
                    </List>
                </Collapse>
            </React.Fragment>
        );
    }
}
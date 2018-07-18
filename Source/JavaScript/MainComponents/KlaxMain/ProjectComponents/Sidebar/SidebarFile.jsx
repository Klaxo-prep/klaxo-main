import React, { Component } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export class SidebarFile extends Component {
    state = {
        showMenu: false,
        anchorEl: null,
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

    render() {
        return (
            <React.Fragment>
                <ListItem
                    dense={true}
                    button={true}
                    style={{ ...this.props.style, paddingLeft: this.props.nest === 0 ? '12px' : this.props.style.paddingLeft }}
                    onClick={_ => this.props.handlers.openFile(this.props)}
                    onContextMenu={this.openMenu}
                >
                    <ListItemIcon>
                        <FileIcon style={{ fontSize: '15px', marginRight: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary={this.props.name} />
                </ListItem>

                <Menu open={this.state.showMenu} anchorEl={this.state.anchorEl} onClose={this.closeMenu}>
                    <MenuItem className="context-menu" onClick={this.closeMenu}>
                        Rename file
                    </MenuItem>
                    <MenuItem className="context-menu" onClick={this.closeMenu}>
                        Delete file
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}
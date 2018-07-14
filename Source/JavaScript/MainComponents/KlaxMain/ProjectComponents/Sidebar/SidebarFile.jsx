import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined';

export const SidebarFile = props => (
    <ListItem dense={true} button={true} style={{ ...props.style, paddingLeft: props.nest === 0 ? '12px' : props.style.paddingLeft }}>
        <ListItemIcon>
            <FileIcon style={{ fontSize: '15px', marginRight: 0 }} />
        </ListItemIcon>
        <ListItemText primary={props.name} />
    </ListItem>
);
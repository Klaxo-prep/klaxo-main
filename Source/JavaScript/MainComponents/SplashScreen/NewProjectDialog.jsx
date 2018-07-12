import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

export default class NewProjectDialog extends Component {
    state = {
        projectName: '',
        directory: ''
    };

    changeName = event => this.setState({
        projectName: event.target.value
    });

    handleSubmit = event => {
        this.props.done(this.state.projectName, this.state.directory);
        this.setState({
            projectName: ''
        });
    };

    handleDirectoryChange = event => {
        const directory = event.target.files[0].path;
        this.setState({
            directory
        });
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
            >
                <DialogTitle id="new-project-dialog-title">Create new project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Build tools will be setup with an entry point to <code>main.cpp</code>. This would be created as
                        a pure C++17 based project.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={this.state.projectName}
                        onChange={this.changeName}
                        id="project-name"
                        margin="normal"
                        placeholder="Project Name"
                        type="text"
                        fullWidth
                    />

                    <input type="file" webkitdirectory="on" id="dir-select" className="invisible-input" onChange={this.handleDirectoryChange} />
                    <section className="directory-input-container">
                        <TextField value={this.state.directory} margin="dense" placeholder="Directory" className="text" disabled={true} />
                        <Button variant="contained" color="secondary" component="label" htmlFor="dir-select" size="small">
                            Select directory
                        </Button>
                    </section>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
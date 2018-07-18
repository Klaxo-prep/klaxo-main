import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class EditorTabs extends Component {
    state = {};
    render() {
        return (
            <nav className="editor-tabs">
                <Tabs
                    value={0}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={this.handleChange}
                >
                    <Tab label={ this.props['temp_path'].split('/').pop() } />
                </Tabs>
            </nav>
        );
    }
}
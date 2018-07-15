import React, { Component } from 'react';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import {SidebarFileSystemWatcher} from "../../../../Functional/SidebarFileSystemWatcher";
import {SidebarFile} from "./SidebarFile";
import {SidebarDirectory} from "./SidebarDirectory";
import {Logger} from "../../../../Functional/Logger";

export default class ProjectSidebar extends Component {
    fsWatcher = null;

    state = {
        initStructure: null
    };

    componentDidMount() {
        this.fsWatcher = new SidebarFileSystemWatcher(this.props.config);
        this.setState({
            initStructure: this.fsWatcher.getInitialStructure()
        }, () => {
            console.log(this.state);
            this.props.logger.log({
                status: 'Initialized with initial file structure.',
                tag: 'sidebar',
                level: Logger.VERBOSE
            });
        });

        this.props.logger.log({
            status: 'Initialized sidebar for project',
            tag: 'startup',
            level: Logger.VERBOSE
        });
    }

    static analyzeNode(node, key, nest, sub = false) {
        if(node['type'] === "file") {
            return (
                <SidebarFile nest={nest} style={sub ? ({ paddingLeft: `${2 * nest}rem` }) : ({})} {...node} key={key} />
            );
        }
        if(node['type'] === "directory") {
            return (
                <SidebarDirectory nest={nest} style={sub ? ({ paddingLeft: `${2 * nest}rem` }) : ({})} {...node} key={key} />
            );
        }
    }

    render() {
        return (
            <aside className="project-sidebar">
                <List
                    subheader={<ListSubheader>Explorer</ListSubheader>}
                >
                    {
                        this.state.initStructure
                            ? (
                                this.state.initStructure.children.map((node, key) => ProjectSidebar.analyzeNode(node, key, 0))
                            )
                            : null
                    }
                </List>
            </aside>
        );
    }
}
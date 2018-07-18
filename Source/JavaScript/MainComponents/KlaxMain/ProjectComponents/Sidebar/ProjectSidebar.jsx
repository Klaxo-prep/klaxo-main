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

    chokidarHandlers = {
        newFile: (path, nonTrimmedPath) => {
            this.props.logger.log({
                status: `New file registered on project dir. Path: ${path}`,
                level: Logger.VERBOSE,
                tag: 'watcher'
            });

            const pathParts = path.split('/');
            pathParts.splice(0, 1);

            if(pathParts.length === 1) {
                // It has been created in the project root

                // Check if it is already present in the tree
                if(this.state.initStructure.children.filter(node => node.type === "file" && node.path === nonTrimmedPath)) {
                    return;
                }

                // If not, go ahead and push the element to the tree
                this.setState(prevState => {
                    const newState = prevState;

                    newState.initStructure.children.push({
                        path: nonTrimmedPath,
                        name: pathParts[0],
                        type: "file",
                        extension: pathParts[0].split('.').pop()
                    });

                    return newState;
                });
            } else {
                this.setState({
                    initStructure: this.fsWatcher.getInitialStructure()
                }, () => this.props.openInEditor(nonTrimmedPath));
            }
        }
    };

    fileHandlers = {
        openFile: file => {
            const path = file.path;
            this.props.openInEditor(path);
        }
    };

    componentDidMount() {
        import("../../../../../SCSS/Sidebar/sidebar.scss");

        this.fsWatcher = new SidebarFileSystemWatcher(this.props.config, this.props.logger);

        this.setState({
            initStructure: this.fsWatcher.getInitialStructure()
        }, () => {
            this.props.logger.log({
                status: 'Initialized with initial file structure.',
                tag: 'sidebar',
                level: Logger.VERBOSE
            });

            this.fsWatcher.startWatching(this.chokidarHandlers);
        });

        this.props.logger.log({
            status: 'Initialized sidebar for project',
            tag: 'startup',
            level: Logger.VERBOSE
        });
    }

    static analyzeNode(node, key, nest, fileHandlers = {}, sub = false) {
        if(node['type'] === "file") {
            return (
                <SidebarFile handlers={fileHandlers} nest={nest} style={sub ? ({ paddingLeft: `${2 * nest}rem` }) : ({})} {...node} key={key} />
            );
        }
        if(node['type'] === "directory") {
            return (
                <SidebarDirectory fileHandlers={fileHandlers} nest={nest} style={sub ? ({ paddingLeft: `${2 * nest}rem` }) : ({})} {...node} key={key} />
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
                                this.state.initStructure.children.map((node, key) => ProjectSidebar.analyzeNode(node, key, 0, this.fileHandlers))
                            )
                            : null
                    }
                </List>
            </aside>
        );
    }
}
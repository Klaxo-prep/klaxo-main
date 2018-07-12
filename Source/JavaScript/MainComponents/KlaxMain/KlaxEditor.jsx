import React, { Component } from 'react';
import KlaxProject from "./ProjectComponents/KlaxProject";

export default class KlaxEditor extends Component {
    logger = null;
    config = null;

    state = {
        mounted: false
    };

    componentDidMount() {
        import("../../../SCSS/Editor/main.scss");
        this.logger = this.props.logger;
        this.config = this.props.config;
        this.setState({
            mounted: true
        });
    }

    mountAsRequired() {
        if(this.props.type === 'project') {
            return <KlaxProject config={this.config} logger={this.logger} />;
        }

        return null;
    }

    render() {
        return (
            <section className="klax-editor-container">
                {
                    this.state.mounted
                        ? (
                            this.mountAsRequired()
                        )
                        : null
                }
            </section>
        )
    }
}
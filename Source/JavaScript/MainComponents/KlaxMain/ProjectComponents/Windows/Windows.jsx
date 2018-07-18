import React, { Component } from 'react';
import Terminal from "./Terminal";

export default class Windows extends Component {
    componentDidMount() {
        import("../../../../../SCSS/Editor/windows.scss");
    }

    render() {
        return (
            <footer className="windows-container">
                <section className="pills">
                    <div role="button" className="pill active">
                        Terminal
                    </div>
                    <div role="button" className="pill">
                        Errors / Warnings
                    </div>
                    <div role="button" className="pill">
                        Git / VCS
                    </div>
                </section>
                <section className="windows">
                    <Terminal />
                </section>
            </footer>
        )
    }
}
import React, { Component } from 'react';

export default class Terminal extends Component {
    state = {
        commands: []
    };

    render() {
        return (
            <article className="window terminal">
                <div className="stmt">
                    <div className="prompt">$ </div>
                    <input className="input" />
                </div>
            </article>
        )
    }
}
import React from 'react';

import("../../../../SCSS/Editor/status-bar.scss");

export const StatusBar = props => (
    <footer className="status-bar">
        <section className="pos-info">
            Line <span className="line-no">{props.line}</span>
            Column <span className="col-no">{props.caretPos}</span>
        </section>
    </footer>
);
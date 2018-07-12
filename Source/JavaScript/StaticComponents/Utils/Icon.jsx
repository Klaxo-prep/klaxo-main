import React from 'react';

export const Icon = props => (
    <div className="app-icon" style={{
        width: props.size ? props.size : 64,
        height: props.size ? props.size : 64
    }} />
);
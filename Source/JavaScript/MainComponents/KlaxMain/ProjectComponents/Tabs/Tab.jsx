import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

export const Tab = props => (
    <div role="button" className="tab">
        <div className="content">
            { props.name }
        </div>
        <div className="close-button">
            <CloseIcon style={{ fontSize: '12px' }} />
        </div>
    </div>
);
import React from 'react';

export const LineNumbers = props => {
    return (
        <section className="line-numbers">
            {
                (new Array(props.lines).fill(0)).map((_, key) => (
                    <div className="line-number" key={key}>
                        { key + 1 }
                    </div>
                ))
            }
        </section>
    )
};
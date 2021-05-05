import React from 'react';
import Pomodoro from './pomodoro';

class Playground extends React.Component {
    constructor() {
        super()
        this.html = `<p>Here is going to be some tools that I developed and wanted to preserve.</p>`;
    }

    render() {
        return React.createElement('div', {id: 'playground'},
                React.createElement('div', {dangerouslySetInnerHTML: {__html: this.html}}),
                React.createElement(Pomodoro, null, null)
               );
    }
}

export default Playground;

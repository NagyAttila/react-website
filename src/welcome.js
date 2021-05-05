import React from 'react';

class Welcome extends React.Component {
    constructor() {
        super()
        this.text =
` ██     ██ ███████ ██       ██████  ██████  ███    ███ ███████
 ██     ██ ██      ██      ██      ██    ██ ████  ████ ██
 ██  █  ██ █████   ██      ██      ██    ██ ██ ████ ██ █████
 ██ ███ ██ ██      ██      ██      ██    ██ ██  ██  ██ ██
  ███ ███  ███████ ███████  ██████  ██████  ██      ██ ███████`;

        this.html = `<div>This site is my personal playground for killing boredom and getting ideas out of my mind. I am not sure if it is useful for anyone, but it is for free so enjoy. ¯\\_(ツ)_/¯</div> `;
    }

    render() {
        return React.createElement('div', {id:'welcome'},
                React.createElement('pre', null, this.text),
                React.createElement('div', {dangerouslySetInnerHTML: {__html: this.html}})
                );
    }
}

export default Welcome;

import React from 'react';

class Greedling extends React.Component {
    constructor(props) {
        super(props);
        this.src = 'https://vignette.wikia.nocookie.net/kingdomthegame/images/6/64/Greedling_h.gif/revision/latest?cb=20190510224339';
        this.gif = "Greedling_h.gif";
        this.dataSrc = 'https://vignette.wikia.nocookie.net/kingdomthegame/images/6/64/Greedling_h.gif/revision/latest?cb=20190510224339';
    }

    render() {
        return React.createElement(
                'div',
                {style: {marginLeft : this.props.marginLeft}, id:"greedling"},
                React.createElement(
                    'img',
                    {
                        src: this.src,
                        'data-image-key': this.gif,
                        'data-image-name': this.gif,
                            'data-src': this.dataSrc,
                        width: "80",
                        height: "60"
                    }
                    )
                );
    }
}

export default Greedling;

import React from 'react';

import Books from './books';
import Empty from './empty';
import Greedling from './greedling';
import Me from './me';
import Menu from './menu';
import Playground from './playground';
import Welcome from './welcome';

export class Main extends React.Component {
    stepSize = 5;
    //rightEnd = 275;
    rightEnd = 200;
    leftEnd = 15;

    // will be true if running on a mobile device
    isMobile = navigator.userAgent.indexOf( "Mobile" ) !== -1 ||
               navigator.userAgent.indexOf( "iPhone" ) !== -1 ||
               navigator.userAgent.indexOf( "Android" ) !== -1 ||
               navigator.userAgent.indexOf( "Windows Phone" ) !== -1 ;

    constructor(props) {
        super(props);
        this.state = {marginLeft : this.leftEnd, currentMenuElement: Welcome,
            menuOpen: false, lastMenu: "WELCOME", isFirst: true};
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    _mapMenuNameToClass(name) {
        switch (name) {
            case "ME": return Me;
            case "BOOKS": return Books;
            case "PLAYGROUND": return Playground;

            default: break;
        }
    }

    _handleClick(e) {
        let liElement  = e.target;
        let magicOffset = 30;
        let marginLeft = liElement.offsetLeft - magicOffset;
        this.setState((state, props) => Object({marginLeft, isFirst: false}));
        this.openMenu(marginLeft);
    }

    openMenu(marginLeft) {
        let menuElement = document.getElementById("menu");
        // let menuElement = mainWrapperElement.children[1];
        let ulElement = menuElement.children[0];
        let liElements = ulElement.children;
        let liOffset = menuElement.offsetLeft + ulElement.offsetLeft;

        let greedlingOffset = liOffset + liElements[0].offsetLeft;
        let greedlingPos = greedlingOffset + marginLeft;
        for (let element of liElements) {
            let leftPos = element.offsetLeft + liOffset;
            let rightPos = leftPos + element.offsetWidth;
            if ( greedlingPos > leftPos && greedlingPos < rightPos ) {
                let menuName = element.innerText;
                let menuType = this._mapMenuNameToClass(menuName);
                if (this.state.menuOpen === false || this.state.lastMenu !== menuName) {
                    this.setState((state,props) => Object({ currentMenuElement: menuType,
                        menuOpen: true,
                        lastMenu: menuName }));
                } else {
                    this.setState((state,props) => Object({ currentMenuElement: Empty,
                        menuOpen: false,
                        lastMenu: menuName}));
                }
                break;
            }
        }
    }


    _handleKeyDown(e) {
        let newKey = e.keyCode;
        switch(newKey) {
            case 39:
            case 68:
            {
                let newPosition = this.state.marginLeft + this.stepSize;
                this.setState((state,props) => Object({...state, marginLeft : newPosition > this.rightEnd ?
                                            this.rightEnd : newPosition}));
                console.log(newPosition)
                break;
            }

            case 37:
            case 65:
            {
                let newPosition = this.state.marginLeft - this.stepSize;
                this.setState((state,props) => Object({...state, marginLeft : newPosition < this.leftEnd ?
                                            this.leftEnd : newPosition}));
                break;
            }

            case 13:
                this.setState((state,props) => Object({isFirst : false}));
                this.openMenu(this.state.marginLeft);
                break;

            default: break;
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown, false);
    }


    render() {
        if (this.isMobile === true) {
            if (this.state.isFirst === true) {
                let disclaimer = "This page is much nicer on a laptop. Anyway, there is some simple content for you if you are fine with it.";
                return React.createElement('div', {id: 'mobileDisclaimer'},
                        React.createElement('h2', null, disclaimer),
                        React.createElement('h1', {className: 'btn', style:{margin:"auto"}, onClick:this._handleClick}, "Click Here")
                        );
            } else {
                return React.createElement('div', {id: 'mainWrapper'},
                        React.createElement(Me, null, null)
                        );
            }
        } else {
            if (this.state.isFirst === true) {
                return React.createElement('div', {id: 'mainWrapper'},
                        React.createElement(Greedling, {marginLeft: this.state.marginLeft}, null),
                        React.createElement('div', {id: 'key-nav'},
                            React.createElement('span', {className: 'btn'}, '←Left'),
                            React.createElement('span', {className: 'btn'}, '↵Enter'),
                            React.createElement('span', {className: 'btn'}, 'Right→')
                            ),
                        React.createElement(Menu, {onClick:this._handleClick}, null),
                        React.createElement(this.state.currentMenuElement, null, null)
                        );
            } else {
                return React.createElement('div', {id: 'mainWrapper'},
                        React.createElement(Greedling, {marginLeft: this.state.marginLeft}, null),
                        React.createElement(Menu, {onClick:this._handleClick}, null),
                        React.createElement(this.state.currentMenuElement, null, null)
                        );
            }
        }
    }
}

export default Main;

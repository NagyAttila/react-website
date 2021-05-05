import React from 'react';

const MAX_LENGTH = 60;
class Pomodoro extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      min: 0,
      sec: 0,
      timerId: undefined,
      isSession: true,
      isRunning: false,
      isRestarted: true,
    };

    this.state.min = this.state.isSession ?
                     this.state.sessionLength :
                     this.state.breakLength ;

    this.bell = new Audio('../bell.mp3');
    this.bell.type = 'audio/mp3';

    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.playSound = this.playSound.bind(this);
    this.scheduleTick = this.scheduleTick.bind(this);
  }

  incrementBreak() {
    if (this.state.breakLength < MAX_LENGTH) {
      this.setState({breakLength: this.state.breakLength+1})
    }
  }

  decrementBreak() {
    if (this.state.breakLength > 1) {
      this.setState({breakLength: this.state.breakLength-1})
    }
  }

  incrementSession() {
    if (this.state.sessionLength < MAX_LENGTH) {

      let sec = this.state.sec;
      let min = this.state.min;
      let sessionLength = this.state.sessionLength + 1;
      if (this.state.isRestarted) {
        sec = 0;
        min = sessionLength;
      }

      this.setState({sessionLength, sec, min});
    }
  }

  decrementSession() {
    if (this.state.sessionLength > 1) {

      let sec = this.state.sec;
      let min = this.state.min;
      let sessionLength = this.state.sessionLength - 1;
      if (this.state.isRestarted) {
        sec = 0;
        min = sessionLength;
      }

      this.setState({sessionLength, sec, min});
    }
  }

  startStop(){
    let isRestarted = false;
    if (this.state.isRunning) {
      let timerId = this.state.timerId;
      clearTimeout(timerId);
      timerId = undefined;
      let isRunning = false;
      this.setState({timerId, isRunning, isRestarted});
    } else {
      let timerId = this.scheduleTick();
      let isRunning = true;
      this.setState({timerId, isRunning, isRestarted});
    }
  }

  playSound() {
    this.bell.currentTime = 0;
    this.bell.play();
  }

  scheduleTick() {
    return setTimeout(() => {
      let sec = this.state.sec;
      let min = this.state.min;
      let isSession = this.state.isSession;
      let isRunning = true;

      if (sec > 0 || min > 0) {
        [sec, min] = sec>0 ? [sec-1, min] : [59, min-1];
      } else {
        this.playSound();
        isSession = !isSession;
        min = (isSession ? this.state.sessionLength : this.state.breakLength);
        sec = 0;
      }

      let timerId = this.scheduleTick();
      this.setState( {sec, min, isSession, timerId, isRunning} );
    }, 1000);
  }

  reset() {
    // Timer
    let timerId = this.state.timerId;
    clearTimeout(timerId);

    // Reset
    timerId = undefined;
    let isSession = true;
    let sec = 0;
    let min = 25;
    let isRunning = false;
    let sessionLength = 25;
    let breakLength = 5;
    let isRestarted = true;

    this.bell.pause();
    this.bell.currentTime = 0;

    this.setState({sec,min,timerId, isSession, isRunning, sessionLength, breakLength, isRestarted});
  }

  print2Digits(number) {
    return number.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  }

  componentWillUnmount() {
      this.reset();
      delete this.bell;

  }

  render() {
      return React.createElement('div', {id:'pomodoro'},
              React.createElement('h1', null, "Pomodoro Clock"),
              React.createElement('hr', null, null),
              React.createElement('div', {className:'label', id:'break-label'}, "Break Length:"),
              React.createElement('div', {className:'incdec round-border'},
                  React.createElement('div', {className:'increment', id:'break-increment', onClick:this.incrementBreak}, "+"),
                  React.createElement('div', {className:'decrement', id:'break-decrement', onClick:this.decrementBreak}, "-"),
                  ),
              React.createElement('div', {className:'length', id:'break-length'}, this.state.breakLength),
              React.createElement('br', null, null),

              React.createElement('div', {className:"label", id:"session-label"},  "Session Length:"),
              React.createElement('div', {className:"incdec round-border"},
                  React.createElement('div', {className:"increment", id:"session-increment", onClick:this.incrementSession}, "+"),
                  React.createElement('div', {className:"decrement", id:"session-decrement", onClick:this.decrementSession}, "-")
                  ),
              React.createElement('div', {className:"length", id:"session-length"}, this.state.sessionLength),

              React.createElement('br', null, null),
              React.createElement('div', {className:"button round-border", id:"start_stop", onClick:this.startStop}, this.state.isRunning ? "Pause" : "Start"),
              React.createElement('div', {className:"button round-border", id:"reset", onClick:this.reset}, "Reset"),

              React.createElement('div', {className:"label", id:"timer-label"}, (this.state.isSession ? "Session" : "Break") + " Timer:"),
              React.createElement('div', {className:"length", id:"time-left"}, this.print2Digits(this.state.min) + ":" + this.print2Digits(this.state.sec)),
              );
  }
}

export default Pomodoro;

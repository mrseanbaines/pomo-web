import React, { Component } from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  .progress {
    transform: rotate(-90deg);
    transform-origin: center;
  }
`

const TimerWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`

const H6 = styled.h6`
  cursor: pointer;
  user-select: none;
`

const TimerContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
`

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerActive: false,
      date: new Date(),
      lineLength: null,
    };

    this.tick = this.tick.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.circle = React.createRef();
  }

  componentWillMount() {
    const { date, sessionLength } = this.state;

    date.setMinutes(sessionLength, 0)

    this.setState({ date });

    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    this.handleResize();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      lineLength: this.circle.current.getTotalLength()
    });
  }

  toggleTimer() {
    const { timerActive } = this.state;

    if (!timerActive) {
      this.timerId = setInterval(() => this.tick(), 1000);
    } else {
      clearInterval(this.timerId);
    }

    this.setState(prevState => ({
      timerActive: !prevState.timerActive,
    }));
  }

  stopTimer() {
    const { date, sessionLength } = this.state;

    clearInterval(this.timerId);

    date.setMinutes(sessionLength, 0);

    this.setState({
      timerActive: false,
    });
  }

  tick() {
    const { date } = this.state;

    if (date.getSeconds() === 0 && date.getMinutes() === 0) return;

    date.setSeconds(date.getSeconds() - 1)

    this.setState({ date });
  }

  render() {
    const { lineLength, timerActive, sessionLength, date } = this.state;
    const sessionSeconds = sessionLength * 60;
    const date2 = new Date();
    date2.setMinutes(25, 0);
    const secondsRemaining = sessionSeconds - parseInt((date2 - date) / 1000, 10);

    return (
      <TimerWrapper>
        <SVG>
          <circle
            cx="50%"
            cy="50%"
            r="calc(50% - 5px)"
            stroke="#fff"
            strokeWidth="2px"
            fill="none"
            strokeDasharray="10"
            opacity="0.4"
            ref={this.circle}
          />

          <circle
            className="progress"
            cx="50%"
            cy="50%"
            r="calc(50% - 5px)"
            stroke="#a1f0ba"
            strokeWidth="10px"
            fill="none"
            strokeDasharray={lineLength}
            strokeDashoffset={lineLength / sessionSeconds * secondsRemaining}
            strokeLinecap="round"
          />
        </SVG>

        <TimerContents id="timer-label">
          <H6 id="reset" onClick={this.stopTimer}>Cancel</H6>
          <h2 id="time-left">
            {date.toLocaleTimeString('en', { minute: '2-digit', second: '2-digit' })}
          </h2>
          <H6 id="start_stop" onClick={this.toggleTimer}>{timerActive ? 'Pause' : 'Start'}</H6>
        </TimerContents>
      </TimerWrapper>
    );
  }
}

export default Timer;

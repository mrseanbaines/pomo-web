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

const Inline = styled.div`
  ${H6} {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
`

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerActive: false,
      currentActive: this.props.sessionLabel,
      date: new Date(),
      lineLength: null,
    };

    this.handleResize = this.handleResize.bind(this);
    this.update = this.update.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.circle = React.createRef();
  }

  componentWillMount() {
    this.update();

    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.time !== this.props.time) {
      this.update();
    }
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

  update() {
    const { date } = this.state;
    const { time } = this.props;

    date.setMinutes(time, 0);

    this.setState({ date });
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

  tick() {
    const { date } = this.state;

    if (date.getSeconds() === 0 && date.getMinutes() === 0) {
      this.props.toggleActive();
      this.update();
    };

    date.setSeconds(date.getSeconds() - 1)

    this.setState({ date });
  }

  stopTimer() {
    const { date } = this.state;
    const { time } = this.props;

    clearInterval(this.timerId);

    date.setMinutes(time, 0);

    this.setState({
      timerActive: false,
    });

    this.props.reset();
  }

  render() {
    const { lineLength, timerActive, date } = this.state;
    const { time } = this.props;
    const sessionSeconds = time * 60;
    const date2 = new Date();
    date2.setMinutes(time, 0);
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

        <TimerContents>
          <H6 id="timer-label">{this.props.currentActive}</H6>
          <h2 id="time-left">
            {date.toLocaleTimeString('en', { minute: '2-digit', second: '2-digit' })}
          </h2>
          <Inline>
          <H6 id="reset" onClick={this.stopTimer}>Reset</H6>
          <H6 id="start_stop" onClick={this.toggleTimer}>{timerActive ? 'Pause' : 'Start'}</H6>
          </Inline>
        </TimerContents>
      </TimerWrapper>
    );
  }
}

export default Timer;

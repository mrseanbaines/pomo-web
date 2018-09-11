import React, { Component } from 'react';
import styled from 'styled-components';
import Timer from '~/src/components/Timer';
import Controls from '~/src/components/Controls';

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  max-width: 375px;
  margin: 0 auto;
`

const Slogan = styled.h6`
  opacity: 0.4;
  text-align: center;
`

const initialState = {
  breakLabel: 'break',
  breakLength: 5,
  sessionLabel: 'session',
  sessionLength: 25,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(key) {
    if (this.state[key] >= 60) return;

    this.setState(prevState => ({
      [key]: prevState[key] + 1
    }));
  }

  decrement(key) {
    if (this.state[key] <= 1) return;

    this.setState(prevState => ({
      [key]: prevState[key] - 1
    }));
  }

  reset() {
    this.setState(initialState);
  }

  render() {
    const {
      breakLabel,
      breakLength,
      sessionLabel,
      sessionLength,
    } = this.state;

    return (
      <AppWrapper>
        <h1>pomo</h1>
        <Slogan>The handy pomodoro timer</Slogan>
        <Timer {...this.state} />
        <Controls
          increment={this.increment}
          decrement={this.decrement}
          label={breakLabel}
          length={breakLength}
        />
        <Controls
          increment={this.increment}
          decrement={this.decrement}
          label={sessionLabel}
          length={sessionLength}
        />
      </AppWrapper>
    );
  }
}

export default App;

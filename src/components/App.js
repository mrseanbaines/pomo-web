import React, { Component } from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Slogan = styled.h6`
  opacity: 0.4;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <h1>pomo</h1>
        <Slogan>The handy pomodoro timer</Slogan>
      </AppWrapper>
    );
  }
}

export default App;

import React, { Component } from 'react';
import styled from 'styled-components';
import Timer from '~/src/components/Timer';

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px;
  max-width: 375px;
  margin: 0 auto;
`

const Slogan = styled.h6`
  opacity: 0.4;
  text-align: center;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <h1>pomo</h1>
        <Slogan>The handy pomodoro timer</Slogan>
        <Timer />
      </AppWrapper>
    );
  }
}

export default App;

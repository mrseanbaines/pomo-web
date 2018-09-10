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

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <h1>pomo</h1>
        <Slogan>The handy pomodoro timer</Slogan>
        <Timer />
        <Controls label="break" initialLength={5} />
        <Controls label="session" initialLength={25} />
      </AppWrapper>
    );
  }
}

export default App;

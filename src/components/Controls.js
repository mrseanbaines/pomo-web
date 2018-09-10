import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const H6 = styled.h6`
  opacity: 0.4;
`

const H3 = styled.h3`
  ::after {
    content: " mins";
  }
`

const ControlsWrapper = styled.div`
  width: 100%;
`

const ControlsWrapperInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

class Controls extends Component {
  render() {
    const { label, initialLength } = this.props;

    return (
      <ControlsWrapper>
        <H6 id={`${label}-label`}>{label} length</H6>
        <ControlsWrapperInner>
          <H3 id={`${label}-length`}>{initialLength}</H3>
          <div id={`${label}-decrement`}>-</div>
          <div id={`${label}-increment`}>+</div>
        </ControlsWrapperInner>
      </ControlsWrapper>
    );
  }
}

export default Controls;

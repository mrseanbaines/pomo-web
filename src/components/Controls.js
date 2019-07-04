import React, { Component } from "react";
import styled from "styled-components";

const H6 = styled.h6`
  opacity: 0.4;
`;

const H3 = styled.h3`
  ::after {
    content: " mins";
  }
`;

const ControlIcon = styled.div`
  font-size: 40px;
  line-height: 0.5;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
`;

const ControlsWrapper = styled.div`
  width: 100%;
`;

const ControlsWrapperInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

class Controls extends Component {
  render() {
    const { label, length } = this.props;

    return (
      <ControlsWrapper>
        <H6 id={`${label}-label`}>{label} length</H6>
        <ControlsWrapperInner>
          <H3 id={`${label}-length`}>{length}</H3>
          <ControlIcon
            id={`${label}-decrement`}
            onClick={() => this.props.decrement(`${label}Length`)}
          >
            -
          </ControlIcon>
          <ControlIcon
            id={`${label}-increment`}
            onClick={() => this.props.increment(`${label}Length`)}
          >
            +
          </ControlIcon>
        </ControlsWrapperInner>
      </ControlsWrapper>
    );
  }
}

export default Controls;

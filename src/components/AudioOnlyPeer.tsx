import VideocamOffIcon from 'material-icons-svg/components/baseline/VideocamOff';
import React from 'react';
import styled from 'styled-components';

const Container = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '#E9ECEC',
  height: '100%'
});

const IconContainer = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '80px',
  '& svg': {
    fill: 'rgba(255, 255, 255, 0.5)'
  }
});

const AudioOnlyPeer = () => (
  <Container>
    <IconContainer>
      <VideocamOffIcon />
    </IconContainer>
  </Container>
);

export default AudioOnlyPeer;

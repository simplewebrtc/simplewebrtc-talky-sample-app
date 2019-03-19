import { Media, VolumeMeter } from '@andyet/simplewebrtc';
import VideocamOffIcon from 'material-icons-svg/components/baseline/VideocamOff';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface AudioOnlyPeerProps {
  audio: Media;
}

const talkingAnimation = keyframes`
    0% {
        transform: scale(0.75);
    }
    100% {
        transform: scale(0.9);
    }
`;

interface AudioVolumeVisualizationProps {
  speaking: boolean;
}

const AudioVolumeVisualization = styled.svg`
  fill: green;
  will-change: transform;
  animation: ${({ speaking }: AudioVolumeVisualizationProps) =>
    speaking
      ? css`
          ${talkingAnimation} 3s ease-in-out infinite alternate
        `
      : ''};
`;

const Container = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '#E9ECEC'
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

const AudioOnlyPeer: React.SFC<AudioOnlyPeerProps> = ({ audio }) => (
  <Container>
    <IconContainer>
      <VideocamOffIcon />
    </IconContainer>
    {/* <AudioVolumeVisualization
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      speaking={true}
    >
      <circle cx="50" cy="50" r="50" />
    </AudioVolumeVisualization> */}
  </Container>
);

export default AudioOnlyPeer;

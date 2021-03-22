import { RequestUserMedia } from '@andyet/simplewebrtc';
import MicIcon from 'material-icons-svg/components/baseline/Mic';
import MicOffIcon from 'material-icons-svg/components/baseline/MicOff';
import VideocamIcon from 'material-icons-svg/components/baseline/Videocam';
import VideocamOffIcon from 'material-icons-svg/components/baseline/VideocamOff';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { TalkyButton } from '../styles/button';
import mq from '../styles/media-queries';
import ScreenshareControls from './ScreenshareControls';

interface MutePauseButtonProps {
  isFlashing?: boolean;
  isOff: boolean;
}

const pulseKeyFrames = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .25;
  }
  100% {
    opacity: 1;
  }
`;

const MuteButton = styled(TalkyButton)<MutePauseButtonProps>`
  background-color: ${props => (props.isOff ? '#e60045' : '')};
  &:not(:hover) svg {
    fill: ${props => (props.isOff ? 'white' : '')};
  }
  &:hover svg {
    fill: '';
  }
  ${props =>
    props.isFlashing
      ? css`
          animation: ${pulseKeyFrames} 0.5s ease-in-out infinite;
        `
      : ''}
  }
  margin-right: 5px;
`;

const PauseButton = styled(TalkyButton)(({ isOff }: MutePauseButtonProps) => ({
  backgroundColor: isOff ? '#e60045' : '',
  '& svg': {
    fill: isOff ? 'white' : ''
  }
}));

const Container = styled.div({
  display: 'flex',
  marginBottom: '10px',
  [mq.MOBILE]: {
    '& button': {
      flex: 1,
      '&:first-of-type': {
        marginRight: '10px'
      }
    }
  },
  [mq.SMALL_DESKTOP]: {
    // justifyContent: 'space-between'
  }
});

interface LocalMediaControlsProps {
  hasAudio: boolean;
  isMuted: boolean;
  unmute: () => void;
  mute: () => void;
  isPaused: boolean;
  isSpeaking: boolean;
  isSpeakingWhileMuted: boolean;
  resumeVideo: () => void;
  pauseVideo: () => void;
  allowShareScreen: boolean;
}

// LocalMediaControls displays buttons to toggle the mute/pause state of the
// user's audio/video.
const LocalMediaControls: React.SFC<LocalMediaControlsProps> = ({
  hasAudio,
  isMuted,
  unmute,
  mute,
  isPaused,
  isSpeakingWhileMuted,
  resumeVideo,
  pauseVideo,
  allowShareScreen,
}) => (
  <Container>
    <RequestUserMedia
      audio={{
        deviceId: {
          ideal: localStorage.preferredAudioDeviceId
        }
      }}
      share={true}
      render={(getMedia, captureState) => (
        <MuteButton
          isOff={isMuted}
          isFlashing={isSpeakingWhileMuted || captureState.requestingMicrophoneCapture}
          onClick={() => {
            if (captureState.requestingCapture) {
              return;
            } else if (!hasAudio) {
              getMedia();
            } else if (isMuted) {
              unmute();
            } else {
              mute();
            }
          }}
        >
          {isMuted ? <MicOffIcon /> : <MicIcon />}
        </MuteButton>
      )}
    />
    <PauseButton isOff={isPaused} onClick={() => (isPaused ? resumeVideo() : pauseVideo())}>
      {isPaused ? <VideocamOffIcon /> : <VideocamIcon />}
    </PauseButton>
    {allowShareScreen && <ScreenshareControls />}
  </Container>
);

export default LocalMediaControls;

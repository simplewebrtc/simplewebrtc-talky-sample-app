import MicIcon from 'material-icons-svg/components/baseline/Mic';
import MicOffIcon from 'material-icons-svg/components/baseline/MicOff';
import VideocamIcon from 'material-icons-svg/components/baseline/Videocam';
import VideocamOffIcon from 'material-icons-svg/components/baseline/VideocamOff';
import React from 'react';
import styled from 'styled-components';
import { TalkyButton } from '../styles/button';
import mq from '../styles/media-queries';
import ScreenshareControls from './ScreenshareControls';

interface MutePauseButtonProps {
  isOff: boolean;
}

const MuteButton = styled(TalkyButton)(({ isOff }: MutePauseButtonProps) => ({
  backgroundColor: isOff ? '#e60045' : '',
  '& svg': {
    fill: isOff ? 'white' : ''
  }
}));

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
    justifyContent: 'space-between'
  }
});

interface LocalMediaControlsProps {
  isMuted: boolean;
  unmute: () => void;
  mute: () => void;
  isPaused: boolean;
  resumeVideo: () => void;
  pauseVideo: () => void;
}

// LocalMediaControls displays buttons to toggle the mute/pause state of the
// user's audio/video.
const LocalMediaControls: React.SFC<LocalMediaControlsProps> = ({
  isMuted,
  unmute,
  mute,
  isPaused,
  resumeVideo,
  pauseVideo
}) => (
  <Container>
    <MuteButton isOff={isMuted} onClick={() => (isMuted ? unmute() : mute())}>
      {isMuted ? <MicOffIcon /> : <MicIcon />}
    </MuteButton>
    <PauseButton
      isOff={isPaused}
      onClick={() => (isPaused ? resumeVideo() : pauseVideo())}
    >
      {isPaused ? <VideocamOffIcon /> : <VideocamIcon />}
    </PauseButton>
    <ScreenshareControls />
  </Container>
);

export default LocalMediaControls;

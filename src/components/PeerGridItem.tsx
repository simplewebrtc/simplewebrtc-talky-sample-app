import { Media, Peer, PeerControls, Video } from '@andyet/simplewebrtc';
import FullScreenIcon from 'material-icons-svg/components/baseline/Fullscreen';
import ExitFullScreenIcon from 'material-icons-svg/components/baseline/FullscreenExit';
import ReportIcon from 'material-icons-svg/components/baseline/Report';
import VisibilityIcon from 'material-icons-svg/components/baseline/Visibility';
import VolumeOffIcon from 'material-icons-svg/components/baseline/VolumeOff';
import VolumeUpIcon from 'material-icons-svg/components/baseline/VolumeUp';

import React, { useContext } from 'react';
import styled from 'styled-components';
import HiddenPeers from '../contexts/HiddenPeers';
import { TalkyButton } from '../styles/button';
import AudioOnlyPeer from './AudioOnlyPeer';
import FullScreen from './Fullscreen';

const MuteButton = styled(TalkyButton)({
  display: 'inline-block',
  justifySelf: 'flex-end',
  opacity: 0.3,
  backgroundColor: 'black',
  color: 'white',
  transition: 'opacity 200ms linear',
  marginBottom: '16px',
  marginLeft: '4px',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'black',
    opacity: 0.7
  },
  '& svg': {
    fill: 'white'
  }
});

const KickButton = styled(TalkyButton)({
  display: 'inline-block',
  justifySelf: 'flex-end',
  opacity: 0.3,
  backgroundColor: 'red',
  color: 'white',
  transition: 'opacity 200ms linear',
  marginBottom: '16px',
  marginLeft: '24px',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'red',
    opacity: 0.7
  },
  '& svg': {
    fill: 'white'
  }
});

const DisplayName = styled.span({
  display: 'inline-block',
  backgroundColor: 'black',
  opacity: 0.3,
  color: 'white',
  marginTop: '16px',
  marginLeft: '4px',
  fontSize: '16px',
  padding: '2px 7px 2px 7px',
  borderRadius: '5px',
  transition: 'opacity 200ms linear',
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.7
  }
});

const PictureInPictureContainer = styled.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  '& video:first-of-type': {},
  '& video:last-of-type': {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '15%',
    maxWidth: '200px',
    minWidth: '100px',
    objectPosition: 'top'
  }
});

interface PeerGridItemMediaProps {
  media: Media[];
  fullScreenActive?: boolean;
}

const LoadingVideo: React.SFC<{
  media: Media;
  qualityProfile?: 'high' | 'medium' | 'low';
}> = props => {
  if (!props.media.loaded) {
    return <AudioOnlyPeer />;
  }
  return (
    <Video
      media={props.media}
      qualityProfile={props.media.screenCapture ? undefined : props.qualityProfile}
    />
  );
};

// PeerGridItemMedia renders a different visualization based on what media is
// available from a peer. It will render video if the peer is sending video,
// otherwise it renders an audio-only display.
const PeerGridItemMedia: React.SFC<PeerGridItemMediaProps> = ({ media, fullScreenActive }) => {
  const videoStreams = media.filter(m => m.kind === 'video' && !m.remoteDisabled);

  if (videoStreams.length > 0) {
    const webcamStreams = videoStreams.filter(s => !s.screenCapture);
    const screenCaptureStreams = videoStreams.filter(s => s.screenCapture);

    if (videoStreams.length === 1) {
      return (
        <LoadingVideo
          media={videoStreams[0]}
          qualityProfile={fullScreenActive ? 'high' : 'medium'}
        />
      );
    }
    if (screenCaptureStreams.length === 0) {
      return (
        <LoadingVideo
          media={webcamStreams[0]}
          qualityProfile={fullScreenActive ? 'high' : 'medium'}
        />
      );
    }

    return (
      <PictureInPictureContainer>
        {/* Screenshare */}
        <LoadingVideo media={screenCaptureStreams[0]} />
        {/* Camera */}
        <Video media={webcamStreams[0]} qualityProfile="low" />
      </PictureInPictureContainer>
    );
  }

  return <AudioOnlyPeer />;
};

const Overlay = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column'
});

const RttContainer = styled.div({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  '& span': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '18px'
  }
});

const MuteIndicator = styled.span({
  textAlign: 'center',
  fontSize: '48px',
  opacity: 0.8
});

const FullScreenButton = styled(TalkyButton)({
  display: 'inline-block',
  justifySelf: 'flex-end',
  opacity: 0.3,
  backgroundColor: 'black',
  color: 'white',
  transition: 'opacity 200ms linear',
  marginBottom: '16px',
  marginLeft: '16px',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'black',
    opacity: 0.7
  },
  '& svg': {
    fill: 'white'
  }
});

const VisibilityButton = styled(TalkyButton)({
  display: 'inline-block',
  justifySelf: 'flex-end',
  opacity: 0.3,
  backgroundColor: 'black',
  color: 'white',
  transition: 'opacity 200ms linear',
  marginBottom: '16px',
  marginLeft: '4px',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'black',
    opacity: 0.7
  },
  '& svg': {
    fill: 'white'
  }
});

function allAudioIsUnmuted(media: Media[]): boolean {
  for (const m of media) {
    if (m.kind === 'audio' && m.remoteDisabled) {
      return false;
    }
  }
  return true;
}

interface PeerGridItemOverlayProps {
  peer: Peer;
  audioIsMuted: boolean;
  fullScreenActive: boolean;
  toggleFullScreen: () => Promise<void>;
  setPassword: (password: string) => void;
}

const PeerGridItemOverlay: React.SFC<PeerGridItemOverlayProps> = ({
  audioIsMuted,
  fullScreenActive,
  peer,
  toggleFullScreen,
  setPassword
}) => {
  const { togglePeer } = useContext(HiddenPeers);
  return (
    <Overlay>
      <div>
        <DisplayName>{peer.displayName}</DisplayName>
      </div>
      <RttContainer>{peer.rtt && <span>{peer.rtt}</span>}</RttContainer>
      <MuteIndicator>
        {peer.muted || audioIsMuted ? (
          <VolumeOffIcon fill={peer.speaking ? 'red' : 'white'} />
        ) : null}
      </MuteIndicator>
      <PeerControls
        peer={peer}
        render={({ isMuted, mute, unmute, kick }) => (
          <div>
            <FullScreenButton
              onClick={toggleFullScreen}
              title={fullScreenActive ? 'Exit full screen' : `Show ${peer.displayName} full screen`}
            >
              {fullScreenActive ? (
                <ExitFullScreenIcon fill="white" />
              ) : (
                <FullScreenIcon fill="white" />
              )}
            </FullScreenButton>
            <VisibilityButton title={`Hide video from ${peer.displayName}`}>
              <VisibilityIcon fill="white" onClick={() => togglePeer(peer.id)} />
            </VisibilityButton>
            <MuteButton
              title={isMuted ? `Unmute ${peer.displayName}` : `Mute ${peer.displayName}`}
              onClick={() => (isMuted ? unmute() : mute())}
            >
              {isMuted ? (
                <>
                  <VolumeOffIcon fill="white" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <VolumeUpIcon fill="white" />
                  <span>Mute</span>
                </>
              )}
            </MuteButton>
            <KickButton
              title="Kick participant from the call"
              onClick={() => {
                kick();
                setPassword(`${Math.floor(Math.random() * 10000)}`);
              }}
            >
              <ReportIcon fill="red" />
              <span>Kick</span>
            </KickButton>
          </div>
        )}
      />
    </Overlay>
  );
};

interface PeerGridItemProps {
  peer: Peer;
  media: Media[];
  setPassword: (password: string) => void;
  onlyVisible: boolean;
}

// PeerGridItem renders various controls over a peer's media.
const PeerGridItem: React.SFC<PeerGridItemProps> = ({ peer, media, setPassword, onlyVisible }) => (
  <FullScreen style={{ width: '100%', height: '100%' }}>
    {({ fullScreenActive, toggleFullScreen }) => (
      <>
        <PeerGridItemOverlay
          peer={peer}
          fullScreenActive={fullScreenActive}
          audioIsMuted={!allAudioIsUnmuted(media)}
          toggleFullScreen={toggleFullScreen}
          setPassword={setPassword}
        />
        <PeerGridItemMedia media={media} fullScreenActive={fullScreenActive || onlyVisible} />
      </>
    )}
  </FullScreen>
);

export default PeerGridItem;

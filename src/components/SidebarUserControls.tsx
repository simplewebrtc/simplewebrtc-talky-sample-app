import { LocalMediaList, Media, MediaControls, UserControls, Video } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import DisplayNameInput from './DisplayNameInput';
import LocalMediaControls from './LocalMediaControls';
import Tooltip from './Tooltip';

const LocalVideo = styled.div({
  position: 'relative',
  '& input': {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    boxSizing: 'border-box',
    border: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: '14px',
    padding: '8px'
  },
  '& video': {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    marginBottom: '10px'
  }
});

const RoomModeToggles = styled.div({
  marginBottom: '10px',
  '& input': {
    marginRight: '5px'
  },
  '& label': {
    fontWeight: 'bold',
    fontSize: '12px'
  }
});

const EmptyVideo = styled.div({
  width: '100%',
  height: '133px',
  backgroundColor: '#262a2c',
  marginBottom: '10px'
});

const ToggleContainer = styled.label({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px'
});

interface Props {
  activeSpeakerView: boolean;
  toggleActiveSpeakerView: () => void;
  pttMode: boolean;
  togglePttMode: (e: React.SyntheticEvent<Element>) => void;
  allowShareScreen: boolean;
  allowWalkieTalkieMode: boolean;
}

interface LocalScreenProps {
  screenshareMedia: Media;
}

const LocalScreenContainer = styled.div({
  position: 'relative'
});

const LocalScreenOverlay = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
  opacity: 0,
  transition: 'opacity 200ms linear',
  color: 'white',
  zIndex: 100,
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8
  }
});

const LocalScreen: React.SFC<LocalScreenProps> = ({ screenshareMedia }) => (
  <MediaControls
    media={screenshareMedia}
    autoRemove={true}
    render={({ media, stopSharing }) => (
      <LocalScreenContainer>
        <LocalScreenOverlay onClick={stopSharing}>
          <span>Stop sharing</span>
        </LocalScreenOverlay>
        {media && <Video media={media!} />}
      </LocalScreenContainer>
    )}
  />
);

const SidebarUserControls: React.SFC<Props> = ({
  activeSpeakerView,
  toggleActiveSpeakerView,
  pttMode,
  togglePttMode,
  allowShareScreen,
  allowWalkieTalkieMode,
}) => (
  <UserControls
    render={({
      hasAudio,
      isMuted,
      mute,
      unmute,
      isPaused,
      isSpeaking,
      isSpeakingWhileMuted,
      pauseVideo,
      resumeVideo,
      user,
      setDisplayName
    }) => (
      <div>
        <LocalVideo>
          <DisplayNameInput displayName={user.displayName} setDisplayName={setDisplayName} />
          <LocalMediaList
            shared={true}
            render={({ media }) => {
              const videos = media.filter(m => m.kind === 'video');
              if (videos.length > 0) {
                return (
                  <>
                    {videos.map(m =>
                      m.screenCapture ? (
                        <LocalScreen key={m.id} screenshareMedia={m} />
                      ) : (
                        <Video key={m.id} media={m} />
                      )
                    )}
                  </>
                );
              }

              return <EmptyVideo />;
            }}
          />
        </LocalVideo>
        <LocalMediaControls
          hasAudio={hasAudio}
          isMuted={isMuted}
          unmute={unmute}
          mute={mute}
          isPaused={isPaused}
          resumeVideo={() => resumeVideo({ screenCapture: false })}
          pauseVideo={() => pauseVideo({ screenCapture: false })}
          isSpeaking={isSpeaking}
          isSpeakingWhileMuted={isSpeakingWhileMuted}
          allowShareScreen={allowShareScreen}
          
        />
        <RoomModeToggles>
          {/*
              Disabled until SDK changes fixed to handle case where no one is speaking.

              <div>
                <ToggleContainer>
                  <input
                    type="checkbox"
                    checked={activeSpeakerView}
                    onChange={toggleActiveSpeakerView}
                  />
                  Active Speaker View
                  <Tooltip text="Only show the active speaker in the podium" />
                </ToggleContainer>
              </div>
            */}
          {allowWalkieTalkieMode && <div>
            <ToggleContainer>
              <input type="checkbox" checked={pttMode} onChange={togglePttMode} />
              Walkie Talkie Mode
              <Tooltip text="Use spacebar to toggle your microphone on/off" />
            </ToggleContainer>
          </div>}
        </RoomModeToggles>
      </div>
    )}
  />
);

export default SidebarUserControls;

import { LocalMediaList, UserControls, Video } from '@andyet/simplewebrtc';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import LocalMediaControls from './LocalMediaControls';

const DISPLAY_NAME_SETTINGS_KEY = '@andyet/talky-core-settings.nick';

interface LocalStorageDisplayNameSetterProps {
  displayName: string;
  setDisplayName: (displayName: string) => void;
}

const LocalStorageDisplayNameSetter: React.SFC<
  LocalStorageDisplayNameSetterProps
> = ({ displayName, setDisplayName }) => {
  useEffect(() => {
    const storedDisplayName = localStorage.getItem(DISPLAY_NAME_SETTINGS_KEY);
    if (
      storedDisplayName !== null &&
      storedDisplayName !== '' &&
      (displayName === '' || displayName === 'Anonymous')
    ) {
      setDisplayName(storedDisplayName);
    } else if (
      displayName !== 'Anonymous' &&
      displayName !== storedDisplayName
    ) {
      localStorage.setItem(DISPLAY_NAME_SETTINGS_KEY, displayName);
    }
  }, [displayName]);
  return null;
};

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

interface Props {
  activeSpeakerView: boolean;
  toggleActiveSpeakerView: () => void;
  pttMode: boolean;
  togglePttMode: (e: React.SyntheticEvent<Element>) => void;
}

const SidebarUserControls: React.SFC<Props> = ({
  activeSpeakerView,
  toggleActiveSpeakerView,
  pttMode,
  togglePttMode
}) => (
  <UserControls
    render={({
      isMuted,
      mute,
      unmute,
      isPaused,
      pauseVideo,
      resumeVideo,
      user,
      setDisplayName
    }) => (
      <div>
        <LocalStorageDisplayNameSetter
          displayName={user.displayName}
          setDisplayName={setDisplayName}
        />
        <LocalVideo>
          <input
            placeholder="Your name (click to edit)"
            value={user.displayName === 'Anonymous' ? '' : user.displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <LocalMediaList
            shared={true}
            render={({ media }) => {
              const videos = media.filter(m => m.kind === 'video');
              if (videos.length > 0) {
                return (
                  <>
                    {videos.map(m => (
                      <Video key={m.id} media={m} />
                    ))}
                  </>
                );
              }

              return <EmptyVideo />;
            }}
          />
        </LocalVideo>
        <LocalMediaControls
          isMuted={isMuted}
          unmute={unmute}
          mute={mute}
          isPaused={isPaused}
          resumeVideo={resumeVideo}
          pauseVideo={pauseVideo}
        />
        <RoomModeToggles>
          <div>
            <label>
              <input
                type="checkbox"
                checked={activeSpeakerView}
                onChange={toggleActiveSpeakerView}
              />
              Active Speaker View
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={pttMode}
                onChange={togglePttMode}
              />
              Walkie Talkie Mode
            </label>
          </div>
        </RoomModeToggles>
      </div>
    )}
  />
);

export default SidebarUserControls;

import { LocalMediaList } from '@andyet/simplewebrtc';
import MicIcon from 'material-icons-svg/components/baseline/Mic';
import VideocamIcon from 'material-icons-svg/components/baseline/Videocam';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TalkyButton } from '../styles/button';
import mq from '../styles/media-queries';
import { Error, Info } from './Alerts';
import DeviceDropdown from './DeviceDropdown';
import DeviceSelector from './DeviceSelector';
import InputChecker from './InputChecker';
import MediaPreview from './MediaPreview';
import ShareControls from './ShareControls';

const Container = styled.div({
  display: 'grid',
  gridTemplateAreas: `
    'header'
    'preview'
    'controls'
  `,
  gridRowGap: '10px',
  gridColumnGap: '10px',
  [mq.SMALL_DESKTOP]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateAreas: `
      'header header'
      'preview controls'
    `
  }
});

const Header = styled.div({
  gridArea: 'header',
  textAlign: 'center',
  paddingTop: '40px',
  [mq.SMALL_DESKTOP]: {
    marginBottom: '30px'
  },
  '& h2': {
    fontSize: '36px',
    fontWeight: 300,
    marginBottom: '10px',

    '& svg': {
      height: '60px',
      verticalAlign: 'text-bottom',
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '-10px'
    }
  },
  '& p': {
    fontSize: '14px'
  },
  '& a': {
    color: '#00b0eb',
    '& hover': {
      color: '#008dbc'
    }
  }
});

const Controls = styled.div({
  gridArea: 'controls',
  padding: '0 10px',
  [mq.SMALL_DESKTOP]: {
    padding: '0',
    width: '300px'
  },
  '& select': {
    border: '1px solid #e9ecec',
    height: '40px',
    padding: '10px',
    marginTop: '5px',
    backgroundColor: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    width: '100%'
  },
  '& label': {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '12px',
    marginTop: '10px',
    marginBottom: '10px',
    '& svg': {
      fontSize: '20px',
      verticalAlign: 'middle',
      marginRight: '5px'
    }
  }
});

const Preview = styled.div({
  gridArea: 'preview',
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column'
});

const PermissionButton = styled(TalkyButton)({
  marginBottom: '5px',
  width: '100%'
});

const Haircheck: React.SFC = () => (
  <Container>
    <Header>
      <h2>
        Ready to join a video chat?
      </h2>
      <p>
        SimpleWebRTC Demo Talky is truly simple video chat and screen sharing for groups.
      </p>
    </Header>
    <Preview>
      <LocalMediaList
        screen={false}
        render={({ media }) => {
          const audioStreams = media.filter(m => m.kind === 'audio');
          const videoStreams = media.filter(m => m.kind === 'video');
          const latestAudio = audioStreams[audioStreams.length - 1];
          const latestVideo = videoStreams[videoStreams.length - 1];

          return <MediaPreview video={latestVideo} audio={latestAudio} />;
        }}
      />
    </Preview>
    <Controls>
      <div>
        <DeviceSelector
          kind="camera"
          render={({
            hasDevice,
            permissionDenied,
            requestingCapture,
            requestPermissions,
            devices,
            currentMedia,
            selectMedia
          }) => {
            if (hasDevice === false) {
              return <Error>No cameras detected.</Error>;
            }

            if (permissionDenied === true) {
              return <Error>Camera permissions denied.</Error>;
            }

            if (requestingCapture === true) {
              return <Info>Requesting cameras...</Info>;
            }

            if (requestPermissions) {
              return (
                <PermissionButton onClick={requestPermissions}>
                  <VideocamIcon />
                  <span>Allow camera access</span>
                </PermissionButton>
              );
            }

            return (
              <label>
                <VideocamIcon />
                <span>Camera:</span>
                <DeviceDropdown
                  currentMedia={currentMedia!}
                  devices={devices!}
                  selectMedia={selectMedia!}
                />
              </label>
            );
          }}
        />
      </div>
      <div>
        <DeviceSelector
          kind="microphone"
          render={({
            hasDevice,
            permissionDenied,
            requestingCapture,
            requestPermissions,
            devices,
            currentMedia,
            selectMedia
          }) => {
            if (hasDevice === false) {
              return <Error>No microphones detected.</Error>;
            }

            if (permissionDenied === true) {
              return <Error>Microphone permissions denied.</Error>;
            }

            if (requestingCapture === true) {
              return <Info>Requesting microphones...</Info>;
            }

            if (requestPermissions) {
              return (
                <PermissionButton onClick={requestPermissions}>
                  <MicIcon />
                  <span>Allow microphone access</span>
                </PermissionButton>
              );
            }

            return (
              <>
                <label>
                  <MicIcon />
                  <span>Microphone:</span>
                  <DeviceDropdown
                    currentMedia={currentMedia!}
                    devices={devices!}
                    selectMedia={selectMedia!}
                  />
                </label>
                <InputChecker
                  media={currentMedia!}
                  threshold={7000}
                  render={({ detected, lost }) => {
                    if (detected && lost) {
                      return <Error>Media lost.</Error>;
                    }

                    if (!detected) {
                      return <Error>No media detected.</Error>;
                    }

                    return null;
                  }}
                />
              </>
            );
          }}
        />
      </div>
      <ShareControls />
    </Controls>
  </Container>
);

export default Haircheck;

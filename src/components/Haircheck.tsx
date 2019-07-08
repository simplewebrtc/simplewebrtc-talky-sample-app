import { LocalMediaList } from '@andyet/simplewebrtc';
import MicIcon from 'material-icons-svg/components/baseline/Mic';
import VideocamIcon from 'material-icons-svg/components/baseline/Videocam';
import React from 'react';
import styled, { css } from 'styled-components';
import Placeholders from '../contexts/Placeholders';
import { TalkyButton } from '../styles/button';
import mq from '../styles/media-queries';
import { colorToString } from '../utils/colorify';
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
  gridArea: 'header'
});

const Controls = styled.div`
  grid-area: controls;
  padding: 0 10px;
  ${mq.SMALL_DESKTOP} {
    padding: 0;
    width: 300px;
  }
  select {
    border: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
    color: ${({ theme }) => colorToString(theme.foreground)};
    height: 40px;
    padding: 10px;
    margin-top: 5px;
    background-color: ${({ theme }) => colorToString(theme.background)};
    font-size: 12px;
    font-weight: bold;
    width: 100%;
  }
  label {
    display: block;
    font-weight: bold;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;

    svg {
      font-size: 20px;
      vertical-align: middle;
      margin-right: 5px;
      fill: ${({ theme }) => colorToString(theme.foreground)};
    }
  }
`;

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
    <Placeholders.Consumer>
      {({ haircheckHeaderPlaceholder }) => (
        <Header
          ref={node => {
            if (
              node &&
              haircheckHeaderPlaceholder &&
              node.childElementCount === 0
            ) {
              const el = haircheckHeaderPlaceholder();
              if (el) {
                node.appendChild(el);
              }
            }
          }}
        />
      )}
    </Placeholders.Consumer>
    <Header />
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
          kind="video"
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
          kind="audio"
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
                      return (
                        <Info>No input detected from your microphone.</Info>
                      );
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

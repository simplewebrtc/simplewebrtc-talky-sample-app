import { Media, Video, VolumeMeter } from '@andyet/simplewebrtc';
import MicIcon from 'material-icons-svg/components/baseline/Mic';
import React from 'react';
import styled from 'styled-components';
import mq from '../styles/media-queries';
import { default as Meter } from './VolumeMeter';

const Container = styled.div({
  height: '300px',
  position: 'relative',
  width: '100%',
  padding: '0 10px',
  [mq.SMALL_DESKTOP]: {
    padding: '0',
    width: '400px'
  },
  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    backgroundColor: '#262a2c'
  }
});

const BlankVideo = styled.div({
  width: '100%',
  height: '100%',
  backgroundColor: '#262a2c',
  color: '#e9ecec',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& p': {
    margin: 0
  }
});

const Volume = styled.div({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '& svg': {
    fontSize: '24px',
    fill: 'white',
    marginTop: '8px'
  },
  '& div': {
    flex: 1
  }
});

const NoVideo = () => (
  <BlankVideo>
    <p>No video selected</p>
  </BlankVideo>
);

interface MediaPreviewProps {
  audio?: Media;
  video?: Media;
}

// MediaPreview displays a camera feed if video is provided, and a VolumeMeter
// if audio is provided.
const MediaPreview: React.SFC<MediaPreviewProps> = ({ audio, video }) => (
  <Container>
    {/* TODO: Display something that communicates media.noInput media.hasEverHadInput */}
    {video && video.loaded ? <Video media={video} /> : <NoVideo />}
    {audio ? (
      <VolumeMeter
        media={audio}
        render={({ volume, speaking }) => (
          <Volume>
            <Meter buckets={20} volume={volume + 100} speaking={speaking} />
            <MicIcon />
          </Volume>
        )}
      />
    ) : null}
  </Container>
);

export default MediaPreview;

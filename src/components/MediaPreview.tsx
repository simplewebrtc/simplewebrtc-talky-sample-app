import { Media, Video } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import mq from '../styles/media-queries';

const Container = styled.div({
  height: '375px',
  position: 'relative',
  width: '100%',
  padding: '0 10px',
  [mq.SMALL_DESKTOP]: {
    padding: '0',
    width: '500px'
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

const NoVideo = () => (
  <BlankVideo>
    <p>No video selected</p>
  </BlankVideo>
);

interface MediaPreviewProps {
  video?: Media;
}

// MediaPreview displays a camera feed if video is provided, and a VolumeMeter
// if audio is provided.
const MediaPreview: React.SFC<MediaPreviewProps> = ({ video }) => (
  <Container>
    {/* TODO: Display something that communicates media.noInput media.hasEverHadInput */}
    {video && video.loaded ? <Video media={video} /> : <NoVideo />}
  </Container>
);

export default MediaPreview;

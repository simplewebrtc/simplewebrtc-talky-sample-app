import { LocalMediaList } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import { TalkyButton } from '../styles/button';

const Container = styled.div({
  textAlign: 'center'
});

const JoinButton = styled(TalkyButton)({
  backgroundColor: '#00b0eb',
  fontSize: '22px',
  color: 'white',
  padding: '10px',
  ':hover': {
    backgroundColor: 'rgb(0, 158, 230)',
    color: 'white'
  }
});

// ShareControls renders a button that when pressed will share all media that
// is populated in LocalMediaList.
const ShareControls: React.SFC = () => (
  <LocalMediaList
    shared={false}
    render={({ media, shareLocalMedia, removeMedia }) => {
      if (media.length === 0) {
        return null;
      }

      const shareAll = () => {
        for (const m of media) {
          shareLocalMedia!(m.id);
        }
      };

      const removeAll = () => {
        for (const m of media) {
          removeMedia!(m.id);
        }
      };

      return (
        <Container>
          <JoinButton onClick={shareAll}>Join call</JoinButton>
        </Container>
      );
    }}
  />
);

export default ShareControls;

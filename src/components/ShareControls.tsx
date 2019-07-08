import { LocalMediaList } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import { TalkyButton } from '../styles/button';
import { colorToString } from '../utils/colorify';

const Container = styled.div({
  textAlign: 'center'
});

const JoinButton = styled(TalkyButton)`
  background-color: ${({ theme }) =>
    colorToString(theme.buttonPrimaryBackground)};
  font-size: 22px;
  color: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
  padding: 10px;
  :hover {
    background-color: ${({ theme }) =>
      colorToString(theme.buttonPrimaryBackgroundHover)};
    color: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
  }
  :active {
    background-color: ${({ theme }) =>
      colorToString(theme.buttonPrimaryBackgroundActive)};
    color: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
  }
`;

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

      return (
        <Container>
          <JoinButton onClick={shareAll}>Join call</JoinButton>
        </Container>
      );
    }}
  />
);

export default ShareControls;

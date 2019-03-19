import { Peer, PeerControls, PeerList } from '@andyet/simplewebrtc';
import VolumeOffIcon from 'material-icons-svg/components/baseline/VolumeOff';
import VolumeUpIcon from 'material-icons-svg/components/baseline/VolumeUp';
import React from 'react';
import styled from 'styled-components';
import { TalkyButton } from '../styles/button';

const Button = styled(TalkyButton)({
  marginRight: '5px'
});

const Container = styled.ul({
  listStyle: 'none',
  '& li': {
    marginBottom: '10px'
  }
});

interface PeerListItemProps {
  peer: Peer;
}
// PeerListItem renders the displayName and mute controls for a peer.
const PeerListItem: React.SFC<PeerListItemProps> = ({ peer }) => (
  <li>
    <PeerControls
      peer={peer}
      render={({ isMuted, mute, unmute }) => (
        <Button onClick={() => (isMuted ? unmute() : mute())}>
          {isMuted ? (
            <VolumeOffIcon fill="#505658" />
          ) : (
            <VolumeUpIcon fill="#505658" />
          )}
        </Button>
      )}
    />
    {peer.displayName || 'Anonymous'}
  </li>
);

interface Props {
  roomAddress: string;
}

const Roster: React.SFC<Props> = ({ roomAddress }) => (
  <PeerList
    room={roomAddress}
    render={({ peers }) => {
      return peers.length > 0 ? (
        <Container>
          {peers.map(peer => (
            <PeerListItem key={peer.id} peer={peer} />
          ))}
        </Container>
      ) : <span />;
    }}
  />
);

export default Roster;

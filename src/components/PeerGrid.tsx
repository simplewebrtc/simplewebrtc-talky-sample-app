import {
  GridLayout,
  Peer,
  PeerList,
  RemoteMediaList
} from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import mq from '../styles/media-queries';
import isMobile from '../utils/isMobile';
import PeerGridItem from './PeerGridItem';

const StyledGridLayout = styled(GridLayout)({
  flex: 1,
  [mq.SMALL_DESKTOP]: {
    height: '100vh'
  },
  backgroundColor: '#eaecec',
  '& video': {
    width: '100%'
  },
  '& > div': {
    position: 'relative'
  }
}) as any; // TODO: Fix this!

interface Props {
  roomAddress: string;
  activeSpeakerView: boolean;
}

// const speakingPeers = peers.filter(p => p.speaking);

// let peersToRender = [];
// if (speakingPeers) {
//   peersToRender = [...speakingPeers, peers.filter(p => p.hasSpokenInLast(5))];
// } else {
//   peersToRender = peers.filter(p => p.hasSpokenInLast(15));
// }

// if (peersToRender.length === 0) {
//   peersToRender = peers;
// }

// PeerGrid is the main video display for Talky. It matches remoteMedia to
// peers and then renders a PeerGridItem for each peer in the room.
const PeerGrid: React.SFC<Props> = ({ roomAddress, activeSpeakerView }) => (
  <PeerList
    speaking={activeSpeakerView ? activeSpeakerView : undefined}
    room={roomAddress}
    render={({ peers }) => {
      return peers.length > 0 || activeSpeakerView ? (
        <StyledGridLayout
          items={peers}
          renderCell={(peer: Peer) => (
            <RemoteMediaList
              peer={peer.address}
              render={({ media }) => <PeerGridItem media={media} peer={peer} />}
            />
          )}
        />
      ) : (
        <div style={{ flex: 1 }}>Waiting for peers to join.</div>
      );
    }}
  />
);

export default PeerGrid;

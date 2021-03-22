import { GridLayout, Peer, PeerList, RemoteMediaList } from '@andyet/simplewebrtc';
import React, { useContext } from 'react';
import styled from 'styled-components';
import HiddenPeers from '../contexts/HiddenPeers';
import Placeholders from '../contexts/Placeholders';
import PeerGridItem from './PeerGridItem';

const StyledGridLayout = styled(GridLayout)({
  flex: 1,
  backgroundColor: '#eaecec',
  maxHeight: 'calc(var(--vh, 1vh) * 100)',
  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  '& > div': {
    position: 'relative'
  }
}) as any; // TODO: Fix this!

interface Props {
  roomAddress: string;
  activeSpeakerView: boolean;
  setPassword: (password: string) => void;
}

const H2 = styled.h2`
  color: rgba(68, 68, 68, 0.25);
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

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
const PeerGrid: React.SFC<Props> = ({ roomAddress, activeSpeakerView, setPassword }) => {
  const { hiddenPeers } = useContext(HiddenPeers);
  return (
    <PeerList
      speaking={activeSpeakerView ? activeSpeakerView : undefined}
      room={roomAddress}
      render={({ peers }) => {
        const visiblePeers = peers.filter(p => !hiddenPeers.includes(p.id));
        return visiblePeers.length > 0 || activeSpeakerView ? (
          <StyledGridLayout
            items={visiblePeers}
            renderCell={(peer: Peer) => (
              <RemoteMediaList
                peer={peer.address}
                render={({ media }) => (
                  <PeerGridItem
                    media={media}
                    peer={peer}
                    setPassword={setPassword}
                    onlyVisible={visiblePeers.length === 1}
                  />
                )}
              />
            )}
          />
        ) : (
          <Placeholders.Consumer>
            {() => (
              <H2>
                There isn't anyone here (yet!)
              </H2>
            )}
          </Placeholders.Consumer>
        );
      }}
    />
  );
};

export default PeerGrid;

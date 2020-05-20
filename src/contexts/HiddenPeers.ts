import React from 'react';

interface Context {
  hiddenPeers: string[];
  togglePeer: (peerId: string) => void;
}

const HiddenPeers = React.createContext<Context>({
  hiddenPeers: [],
  togglePeer: () => null
});

export default HiddenPeers;

import { ChatList, PeerList, UserControls } from '@andyet/simplewebrtc';
import React from 'react';

import ChatNotifications from './ChatNotifications';
import PeerNotifications from './PeerNotifications';

import { createSoundPlayer } from '../utils/sounds';

const throttledPeerEnter = createSoundPlayer('sound-peer-enter');
const throttledPeerExit = createSoundPlayer('sound-peer-exit');
const throttledSend = createSoundPlayer('sound-message-send');
const throttledReceive = createSoundPlayer('sound-message-receive');

interface Props {
  roomAddress: string;
}

const SoundPlayer: React.SFC<Props> = ({ roomAddress }) => (
  <UserControls
    render={({ user }) => (
      <>
        <PeerList
          room={roomAddress}
          render={({ peers }) => (
            <PeerNotifications
              peers={peers}
              onPeerEnter={() => throttledPeerEnter(user.audioOutputDeviceId)}
              onPeerExit={() => throttledPeerExit(user.audioOutputDeviceId)}
            />
          )}
        />
        <ChatList
          room={roomAddress}
          render={({ groups }) => (
            <ChatNotifications
              groups={groups}
              onSend={() => throttledSend(user.audioOutputDeviceId)}
              onReceive={() => throttledReceive(user.audioOutputDeviceId)}
            />
          )}
        />
      </>
    )}
  />
);

export default SoundPlayer;

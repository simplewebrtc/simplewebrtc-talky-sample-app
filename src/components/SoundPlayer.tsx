import { Notifications, UserControls } from '@andyet/simplewebrtc';
import React from 'react';

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
      <Notifications
        onPeerEntered={() => throttledPeerEnter(user.audioOutputDeviceId)}
        onPeerLeft={() => throttledPeerExit(user.audioOutputDeviceId)}
        onChatSent={() => throttledSend(user.audioOutputDeviceId)}
        onChatReceived={() => throttledReceive(user.audioOutputDeviceId)}
      />
    )}
  />
);

export default SoundPlayer;

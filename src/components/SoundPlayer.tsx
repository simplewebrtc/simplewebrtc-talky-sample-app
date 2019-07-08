import { ChatList, PeerList } from '@andyet/simplewebrtc';
import { throttle } from 'lodash-es';
import React from 'react';
import getConfigFromMetaTag from '../utils/metaConfig';
import ChatNotifications from './ChatNotifications';
import PeerNotifications from './PeerNotifications';

const DEBOUNCE_INTERVAL = 1000;

const peerEnterSoundUrl = getConfigFromMetaTag('sound-peer-enter');
const peerEnterSound = peerEnterSoundUrl ? new Audio(peerEnterSoundUrl) : null;
function peerEnter() {
  if (peerEnterSound !== null) {
    peerEnterSound.play();
  }
}
const throttledPeerEnter = throttle(peerEnter, DEBOUNCE_INTERVAL, {
  trailing: false
});

const peerExitSoundUrl = getConfigFromMetaTag('sound-peer-exit');
const peerExitSound = peerExitSoundUrl ? new Audio(peerExitSoundUrl) : null;
function peerExit() {
  if (peerExitSound !== null) {
    peerExitSound.play();
  }
}
const throttledPeerExit = throttle(peerExit, DEBOUNCE_INTERVAL, {
  trailing: false
});

const messageSendSoundUrl = getConfigFromMetaTag('sound-message-send');
const messageSendSound = messageSendSoundUrl
  ? new Audio(messageSendSoundUrl)
  : null;
function send() {
  if (messageSendSound !== null) {
    messageSendSound.play();
  }
}
const throttledSend = throttle(send, DEBOUNCE_INTERVAL, { trailing: false });

const messageReceiveSoundUrl = getConfigFromMetaTag('sound-message-receive');
const messageReceiveSound = messageReceiveSoundUrl
  ? new Audio(messageReceiveSoundUrl)
  : null;
function receive() {
  if (messageReceiveSound !== null) {
    messageReceiveSound.play();
  }
}
const throttledReceive = throttle(receive, DEBOUNCE_INTERVAL, {
  trailing: false
});

interface Props {
  roomAddress: string;
}

const SoundPlayer: React.SFC<Props> = ({ roomAddress }) => (
  <>
    <PeerList
      room={roomAddress}
      render={({ peers }) => (
        <PeerNotifications
          peers={peers}
          onPeerEnter={throttledPeerEnter}
          onPeerExit={throttledPeerExit}
        />
      )}
    />
    <ChatList
      room={roomAddress}
      render={({ groups }) => (
        <ChatNotifications
          groups={groups}
          onSend={throttledSend}
          onReceive={throttledReceive}
        />
      )}
    />
  </>
);

export default SoundPlayer;

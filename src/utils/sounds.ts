import { throttle } from 'lodash-es';

import getConfigFromMetaTag from '../utils/metaConfig';

const SOUNDS = new Map();
const SOUND_NAMES = [
  'sound-test-output',
  'sound-peer-enter',
  'sound-peer-exit',
  'sound-message-send',
  'sound-message-receive'
];
const SOUND_URLS: Map<string, string> = new Map();
const SOUND_PLAYERS: Map<string, HTMLAudioElement> = new Map();

for (const name of SOUND_NAMES) {
  const soundUrl = getConfigFromMetaTag(name);
  if (soundUrl) {
    SOUND_URLS.set(name, soundUrl);
    SOUND_PLAYERS.set(name, new Audio());
  }
}

export function hasSound(name: string) {
  return SOUND_PLAYERS.has(name);
}

let ranInit = false;
export function initSounds() {
  if (ranInit) {
    return;
  }
  ranInit = true;
  for (const [name, player] of SOUND_PLAYERS) {
    player.play().catch(err => {
      // This will probably cause an error, but that is ok.
      // We just want to flag the audio player as having
      // started playing as a result of a user gesture.
    });
  }
}

export function createSoundPlayer(name: string, debouceInterval: number = 1000) {
  const play = (deviceId: string = 'default') => {
    const sound = SOUND_PLAYERS.get(name);
    if (!sound) {
      return;
    }
    if (!sound.src) {
      sound.src = SOUND_URLS.get(name)!;
    }
    return new Promise(resolve => {
      if (!sound) {
        return resolve();
      }
      if ((sound as any).sinkId !== deviceId && (sound as any).setSinkId) {
        (sound as any).setSinkId(deviceId).then(() => {
          sound.play();
        });
      } else {
        sound.play();
      }
      sound.onended = resolve;
    });
  };

  return throttle(play, debouceInterval, { trailing: false });
}

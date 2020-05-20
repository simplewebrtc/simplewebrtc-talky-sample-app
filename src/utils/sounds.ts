import { throttle } from 'lodash-es';

import getConfigFromMetaTag from '../utils/metaConfig';

export function createSoundPlayer(name: string, debouceInterval: number = 1000) {
  const url = getConfigFromMetaTag(name);
  const sound = url ? new Audio(url) : null;

  const play = (deviceId: string = 'default') => {
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

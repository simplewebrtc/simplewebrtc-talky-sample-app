import mq from '../styles/media-queries';

export default function isMobile() {
  const media = mq.MOBILE.substr('@media '.length);
  return window.matchMedia(media).matches;
}

// Some iOS devices result in overwhelming clicks and echoes that
// come from creating a WebAudio context. Since WebAudio is what
// we use for volume monitoring and speech detection, we can't
// enable those features on certain models.
//
// Those devices are:
// - iPhone XR
// - iPhone XS
// - iPhone XS Max
export function deviceSupportsVolumeMonitoring() {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (!isSafari) {
    return true;
  }
  const width = window.screen.width * window.devicePixelRatio;
  const height = window.screen.height * window.devicePixelRatio;
  // Detect iPhone XR
  if (window.devicePixelRatio === 2 && width === 828 && height === 1792) {
    return false;
  }
  // Detect iPhone XS
  if (window.devicePixelRatio === 3 && width === 1125 && height === 2436) {
    return false;
  }
  // Detect iPhone XS Max
  if (window.devicePixelRatio === 3 && width === 1242 && height === 2688) {
    return false;
  }
  return true;
}

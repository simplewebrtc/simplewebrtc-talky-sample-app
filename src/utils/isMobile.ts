import mq from '../styles/media-queries';

export default function isMobile() {
  const media = mq.MOBILE.substr('@media '.length);
  return window.matchMedia(media).matches;
}

import emojiShortcodes, { Shortcode } from './emojiShortcodes';

const aliases: { [key: string]: Shortcode } = {
  ':thumbsup:': ':thumbs-up:',
  ':+1:': ':thumbs-up:',
  ':wink:': ':winking-face:',
  ':bath:': ':bathtub:'
};

export default function emojify(text: string): string {
  return text.replace(/(:[a-z0-9-]+:)/gi, match => {
    if (emojiShortcodes.hasOwnProperty(match)) {
      return emojiShortcodes[match as Shortcode];
    } else if (aliases.hasOwnProperty(match)) {
      return emojiShortcodes[aliases[match]];
    }
    return match;
  });
}

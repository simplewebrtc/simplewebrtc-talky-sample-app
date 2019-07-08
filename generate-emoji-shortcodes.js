const fetch = require('node-fetch');
const fs = require('fs');
const prettier = require('prettier');

function writeFile(path, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contents, err => {
      if (err) reject(err);
      resolve();
    });
  });
}

async function writeMapping(data) {
  const contents = `const emojiShortcodes = ${JSON.stringify(data, null, 2)};
    
    export type Shortcode = keyof typeof emojiShortcodes;
    export default emojiShortcodes;`;

  const configFile = await prettier.resolveConfigFile(
    'src/utils/emojiShortcodes.ts'
  );
  const config = await prettier.resolveConfig(configFile);
  const formattedContents = prettier.format(contents, {
    ...config,
    parser: 'typescript'
  });
  await writeFile('src/utils/emojiShortcodes.ts', formattedContents);
}

function fullyQualified(line) {
  return line.includes('; fully-qualified');
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function parseEmoji(l) {
  const components = l
    .split(';')[0]
    .trim()
    .split(' ');
  const emoji = components
    .map(s => String.fromCodePoint(parseInt(s, 16)))
    .join('');

  const description = l.split('#')[1];
  const shortcode = `:${slugify(description)}:`;
  return { shortcode, emoji };
}

(async () => {
  const res = await fetch(
    'https://unicode.org/Public/emoji/12.0/emoji-test.txt'
  );
  const rawData = await res.text();
  const lines = rawData.split('\n');
  const parsedEmoji = lines.filter(fullyQualified).map(parseEmoji);
  const mapping = parsedEmoji.reduce((a, b) => {
    a[b.shortcode] = b.emoji;
    return a;
  }, {});
  await writeMapping(mapping);
})();

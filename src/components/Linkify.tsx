import React from 'react';

const re = /((?:(?:https|http):\/\/)?(?:[a-z0-9.]*\.[a-z]+))/gi;

function getUrls(text: string) {
  const matches = [];
  let match = re.exec(text);
  while (match !== null) {
    matches.push(match);
    match = re.exec(text);
  }
  return matches;
}

interface DetectedUrls {
  url?: string;
  text?: string;
}

function getTextSegments(text: string): DetectedUrls[] {
  const matches = getUrls(text);
  if (matches.length < 1) {
    return [{ text }];
  }

  const segments: DetectedUrls[] = [];
  let currentIndex = 0;
  matches.forEach(match => {
    if (match.index === 0) {
      segments.push({ url: match[0] });
    } else if (match.index > 0) {
      segments.push({ text: text.slice(currentIndex, match.index) });
      segments.push({ url: match[0] });
      currentIndex = match.index + match[0].length;
    }
    currentIndex = match.index + match[0].length;
  });
  segments.push({ text: text.slice(currentIndex, text.length) });
  return segments;
}

interface Props {
  text: string;
}

const Linkify = React.memo<Props>(({ text }) => {
  const segments = getTextSegments(text);

  return (
    <>
      {segments.map(s => {
        if (s.text) {
          return <span key={s.text}>{s.text}</span>;
        } else if (s.url) {
          return (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.url}
            </a>
          );
        }

        return null;
      })}
    </>
  );
});

export default Linkify;

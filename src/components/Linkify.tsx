import React from 'react';

const re = /((?:(?:https|http):\/\/)?(?:[a-z0-9.]*\.[a-z]+)(\/[^\s]*)?)/gi;

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
  scheme?: boolean;
  slashes?: boolean;
}

function getTextSegments(text: string): DetectedUrls[] {
  const matches = getUrls(text);
  if (matches.length < 1) {
    return [{ text }];
  }

  const segments: DetectedUrls[] = [];
  let currentIndex = 0;
  matches.forEach(match => {
    const url = match[0];
    const lower = url.toLowerCase();

    if (match.index === 0) {
      segments.push({
        url,
        scheme: lower.startsWith('http:') || lower.startsWith('https:'),
        slashes: url.startsWith('//')
      });
    } else if (match.index > 0) {
      segments.push({ text: text.slice(currentIndex, match.index) });
      segments.push({
        url,
        scheme: lower.startsWith('http:') || lower.startsWith('https:'),
        slashes: url.startsWith('//')
      });
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
              href={s.scheme ? s.url : s.slashes ? s.url : `https://${s.url}`}
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

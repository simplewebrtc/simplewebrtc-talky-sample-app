function getConfigFromMetaTag(param: string): string | null {
  const tag = document.head.querySelector(`meta[name=simplewebrtc-${param}]`);
  if (tag) {
    const content = tag.getAttribute('content');
    if (content !== null) {
      return content;
    }
  }

  return null;
}

export default getConfigFromMetaTag;

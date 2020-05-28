import React, { useEffect, useState } from 'react';

interface Props {
  displayName: string;
  setDisplayName: (name: string) => void;
}

const DISPLAY_NAME_SETTINGS_KEY = 'displayName';

function setLocalDisplayName(displayName: string) {
  localStorage.setItem(DISPLAY_NAME_SETTINGS_KEY, displayName);
}

function getLocalDisplayName() {
  return localStorage.getItem(DISPLAY_NAME_SETTINGS_KEY) || '';
}

const DisplayNameInput: React.SFC<Props> = ({ displayName, setDisplayName }) => {
  const [typedName, setTypedName] = useState(displayName === 'Anonymous' ? '' : displayName);

  const persisDisplayName = (name: string) => {
    setDisplayName(name);
    setLocalDisplayName(name);
  };

  useEffect(() => {
    const localDisplayName = getLocalDisplayName();
    if (localDisplayName !== null && localDisplayName !== displayName) {
      setDisplayName(localDisplayName);
      setTypedName(localDisplayName);
    }
  }, [displayName, setDisplayName, setTypedName]);

  return (
    <input
      placeholder="Your name (click to edit)"
      value={typedName}
      onChange={e => setTypedName(e.target.value)}
      onKeyPress={({ key }) => {
        if (key === 'Enter') {
          persisDisplayName(typedName);
        }
      }}
      onBlur={() => {
        persisDisplayName(typedName);
      }}
    />
  );
};

export default DisplayNameInput;

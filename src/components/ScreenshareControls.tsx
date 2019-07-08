import { RequestDisplayMedia, screensharing } from '@andyet/simplewebrtc';
import ShareScreenIcon from 'material-icons-svg/components/baseline/ScreenShare';
import React from 'react';
import styled from 'styled-components';
import { buttonBase, TalkyButton } from '../styles/button';
import mq from '../styles/media-queries';

const EXTENSION_ID =
  process.env.NODE_ENV === 'production'
    ? 'kochadnnpmbkfdhlaajaemgjmkjfhfkb'
    : 'ikljcimogjdaoojhmkbioipmffflodgk';

const Button = styled(TalkyButton)({
  display: 'none',
  [mq.SMALL_DESKTOP]: {
    display: 'block'
  }
});

const ButtonLink = styled.a({
  ...buttonBase,
  display: 'none',
  [mq.SMALL_DESKTOP]: {
    display: 'block'
  },
  alignItems: 'center'
});

const EmptySpacer = styled.span({
  width: '120px'
});

// ScreenshareControls displays a button that activates the screenshare flow.
// It also provides a link to install the screenshare extension if it is
// required by the user's browser.
const ScreenshareControls: React.SFC = () => (
  <RequestDisplayMedia
    extensionId={EXTENSION_ID}
    render={(getDisplayMedia, sharing) => {
      if (sharing.ready) {
        return (
          <Button title="Screen Share" onClick={getDisplayMedia}>
            <ShareScreenIcon fill="#505658" />
            <span>Share screen</span>
          </Button>
        );
      }
      if (sharing.extensionRequired && !sharing.extensionInstalled) {
        return (
          <ButtonLink
            target="_blank"
            rel="noopener"
            onClick={() => sharing.listenForInstallation!()}
            href={screensharing.getExtensionURL(EXTENSION_ID)}
          >
            <ShareScreenIcon fill="#505658" />
            <span>Share screen</span>
          </ButtonLink>
        );
      }
      if (!sharing.available) {
        return <EmptySpacer />;
      }
    }}
  />
);

export default ScreenshareControls;

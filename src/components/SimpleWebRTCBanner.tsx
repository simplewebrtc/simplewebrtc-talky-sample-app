import React, { Component } from 'react';
import styled from 'styled-components';

const Banner = styled.div({
  padding: '15px',
  position: 'relative',
  backgroundColor: '#e3f8ff',
  color: '#00b0e9',
  textAlign: 'center',
  '& a': {
    fontWeight: 'bold',
    color: '#00b0e9',
    ':visited': {
      color: '#00b0e9'
    },
    ':hover': {
      color: '#008dba'
    }
  },
  '& p:last-of-type': {
    margin: 0
  },
  ':after': {
    border: 'solid transparent',
    content: `''`,
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderWidth: '5px'
  },
  '& svg': {
    position: 'absolute',
    right: '15px',
    top: 'calc(50% - (6px))',
    marginLeft: '10px',
    cursor: 'pointer'
  }
});

const bannerSettingKey = '@andyet/talky-core-settings.hideBannerUntil';

interface State {
  hidden: boolean;
}

export default class SimpleWebRTCBanner extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    const hiddenUntil = localStorage.getItem(bannerSettingKey);
    if (
      hiddenUntil === null ||
      (hiddenUntil !== null && Date.now() > parseInt(hiddenUntil, 10))
    ) {
      this.state = { hidden: false };
    } else {
      this.state = { hidden: true };
    }
  }

  public render() {
    const isTalkyDomain = window.location.host === 'talky.io';
    if (!this.state.hidden && isTalkyDomain) {
      return (
        <Banner>
          Build your app on Talky in no time with{' '}
          <a
            href="https://blog.simplewebrtc.com/2019/04/08/talky-is-now-the-simplewebrtc-sample-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            SimpleWebRTC »
          </a>
          <svg
            onClick={this.hideBanner}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="12"
            height="12"
            fill="none"
            stroke="currentcolor"
            strokeWidth="3"
            style={{
              display: 'inline-block',
              overflow: 'visible',
              verticalAlign: 'middle'
            }}
          >
            <path d="M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179" />
            <path d="M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179" />
          </svg>
        </Banner>
      );
    }

    return null;
  }

  private hideBanner = () => {
    this.setState({ hidden: true }, () => {
      localStorage.setItem(
        bannerSettingKey,
        (Date.now() + 86400 * 1000 * 7).toString()
      );
    });
  };
}

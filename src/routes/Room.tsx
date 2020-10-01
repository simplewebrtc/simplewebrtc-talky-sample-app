import {
  Actions,
  Connected,
  Connecting,
  Disconnected,
  Failed,
  PeerList,
  Provider,
  RemoteAudioPlayer,
  Room
} from '@andyet/simplewebrtc';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ChatContainer from '../components/ChatContainer';
import ChatToggle from '../components/ChatToggle';
import Haircheck from '../components/Haircheck';
import PasswordEntry from '../components/PasswordEntry';
import PeerGrid from '../components/PeerGrid';
import Sidebar from '../components/Sidebar';
import SoundPlayer from '../components/SoundPlayer';
import HiddenPeers from '../contexts/HiddenPeers';
import mq from '../styles/media-queries';

const PasswordEntryContainer = styled.div({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'center',
  position: 'relative'
});

const RootContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(var(--vh, 1vh) * 100)'
});

const Container = styled.div({
  flex: 1,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  [mq.SMALL_DESKTOP]: {
    flexDirection: 'row'
  }
});

const LoadingState = styled.div({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'center',
  position: 'relative'
});

const RecordingIndicator = styled.div`
  display: inline-block;
  height: 25px;
  width: 25px;
  margin: 15px;
  right: 0;
  background-color: #d82007;
  border-radius: 50%;
  position: absolute;
  z-index: 10;

  &:hover .tooltip {
    visibility: visible;
  }
  .tooltip {
    visibility: hidden;
    width: 180px;
    top: -5px;
    right: 105%;
    color: #fff;
    background-color: gray;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }
`;

interface Props {
  configUrl: string;
  userData?: string;
  name: string;
  initialPassword?: string;
  mute?: () => void;
  unmute?: () => void;
}

interface State {
  activeSpeakerView: boolean;
  consentToJoin: boolean;
  pttMode: boolean;
  sendRtt: boolean;
  password?: string;
  chatOpen: boolean;
  hiddenPeers: string[];
}

class Index extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeSpeakerView: false,
      consentToJoin: false,
      password: props.initialPassword,
      pttMode: false,
      sendRtt: false,
      chatOpen: false,
      hiddenPeers: []
    };
  }

  public render() {
    return (
      <Provider configUrl={this.props.configUrl} userData={this.props.userData}>
        <RemoteAudioPlayer />
        <HiddenPeers.Provider
          value={{
            hiddenPeers: this.state.hiddenPeers,
            togglePeer: this.togglePeer
          }}
        >
          <RootContainer>
            {!this.state.consentToJoin && (
              <Haircheck
                onAccept={() => {
                  this.setState({ consentToJoin: true });
                }}
              />
            )}
            {this.state.consentToJoin && (
              <Room password={this.state.password} name={this.props.name}>
                {({ room }) => {
                  return (
                    <Container>
                      <SoundPlayer roomAddress={room.address!} />
                      <Sidebar
                        roomAddress={room.address!}
                        activeSpeakerView={this.state.activeSpeakerView}
                        toggleActiveSpeakerView={this.toggleActiveSpeakerView}
                        pttMode={this.state.pttMode}
                        togglePttMode={this.togglePttMode}
                        setPassword={this.setPassword}
                        passwordRequired={room.passwordRequired}
                        roomId={room.id!}
                        currentPassword={room.password}
                      />
                      <Connecting>
                        <LoadingState>
                          <h1>Connecting...</h1>
                        </LoadingState>
                      </Connecting>
                      <Disconnected>
                        <LoadingState>
                          <h1>Lost connection. Reattempting to join...</h1>
                        </LoadingState>
                      </Disconnected>
                      <Failed>
                        <LoadingState>
                          <h1>Connection failed.</h1>
                        </LoadingState>
                      </Failed>
                      <Connected>
                        {room.joined ? (
                          <Container>
                            <PeerList
                              room={room.address!}
                              filter={(peer) => { return peer.customerData.isAHiddenBot }}
                              render={({ peers }) => peers.length > 0 ?
                                <RecordingIndicator>
                                  <div className='tooltip'>
                                    This call is recorded
                                  </div>
                                </RecordingIndicator> : null}
                            />
                            <PeerGrid
                              roomAddress={room.address!}
                              activeSpeakerView={this.state.activeSpeakerView}
                              setPassword={this.setPassword}
                              />
                          </Container>
                        ) : room.passwordRequired ? (
                          <PasswordEntryContainer>
                            <PasswordEntry
                              setting={false}
                              passwordIsIncorrect={!!this.state.password}
                              setPassword={this.setPassword}
                            />
                          </PasswordEntryContainer>
                        ) : room.roomNotStarted ? (
                          <LoadingState>
                            <h1>This room has not started yet.</h1>
                          </LoadingState>
                        ) : room.banned ? (
                          <LoadingState>
                            <h1>This room is not available.</h1>
                          </LoadingState>
                        ) : (
                          <LoadingState>
                            <h1>Joining room...</h1>
                          </LoadingState>
                        )}
                      </Connected>
                      {this.state.chatOpen ? (
                        <ChatContainer
                          disabled={!room.joined}
                          roomAddress={room.address!}
                          sendRtt={this.state.sendRtt}
                          toggleRtt={this.toggleRtt}
                          toggleChat={this.toggleChat}
                        />
                      ) : (
                        <ChatToggle roomAddress={room.address!} onClick={this.toggleChat} />
                      )}
                    </Container>
                  );
                }}
              </Room>
            )}
          </RootContainer>
        </HiddenPeers.Provider>
      </Provider>
    );
  }

  private toggleActiveSpeakerView = () => {
    this.setState({ activeSpeakerView: !this.state.activeSpeakerView });
  };

  private toggleRtt = () => {
    this.setState({ sendRtt: !this.state.sendRtt });
  };

  private togglePttMode = (e: React.SyntheticEvent) => {
    this.setState({ pttMode: !this.state.pttMode }, () => {
      if (this.state.pttMode) {
        document.addEventListener('keydown', this.unmute);
        document.addEventListener('keyup', this.mute);
        window.addEventListener('blur', this.props.mute!);
        this.props.mute!();
      } else {
        document.removeEventListener('keydown', this.unmute);
        document.removeEventListener('keyup', this.mute);
        window.removeEventListener('blur', this.props.mute!);
        this.props.unmute!();
      }
    });

    if (e.target) {
      (e.target as HTMLElement).blur();
    }
  };

  private mute = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      this.props.mute!();
    }
  };

  private unmute = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      this.props.unmute!();
    }
  };

  private setPassword = (password: string) => {
    if (password) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', `${window.location.pathname}?password=${password}`);
    } else {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', `${window.location.pathname}`);
    }
    this.setState({ password });
  };

  private toggleChat = () => {
    this.setState({ chatOpen: !this.state.chatOpen });
  };

  private togglePeer = (peerId: string) => {
    if (this.state.hiddenPeers.includes(peerId)) {
      const hiddenPeers = [...this.state.hiddenPeers];
      const index = hiddenPeers.indexOf(peerId);
      hiddenPeers.splice(index);
      this.setState({ hiddenPeers });
    } else {
      this.setState({ hiddenPeers: [...this.state.hiddenPeers, peerId] });
    }
  };
}

function mapDispatchToProps(dispatch: any, props: Props): Props {
  return {
    ...props,
    mute: () => dispatch(Actions.muteSelf()),
    unmute: () => dispatch(Actions.unmuteSelf())
  };
}

export default connect(null, mapDispatchToProps)(Index);

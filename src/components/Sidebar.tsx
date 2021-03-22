import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import mq from '../styles/media-queries';
import { colorToString } from '../utils/colorify';
import RoomControls from './RoomControls';
import Roster from './Roster';
import SidebarLinks from './SidebarLinks';
import SidebarUserControls from './SidebarUserControls';

const Container = styled.div`
  position: relative;
  padding: 10px;
  ${mq.MOBILE} {
    position: absolute;
    z-index: 200;
    top: 0;
    width: 185px;
  }
  ${mq.SMALL_DESKTOP} {
    width: 220px;
    border-right: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  }
`;

interface Props {
  roomAddress: string;
  activeSpeakerView: boolean;
  toggleActiveSpeakerView: () => void;
  pttMode: boolean;
  togglePttMode: (e: React.SyntheticEvent) => void;
  setPassword: (s: string) => void;
  passwordRequired?: boolean;
  roomId: string;
  currentPassword?: string;
  allowInvites: boolean;
  allowShareScreen: boolean;
  allowWalkieTalkieMode: boolean;
}

interface State {
  showPasswordModal: boolean;
}

// Sidebar contains all the UI elements that are rendered in the Sidebar
// inside a Room.
// TODO: Use Router to navigate to feedback page.
export default class Sidebar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showPasswordModal: false };
  }

  public render() {
    const {
      roomAddress,
      activeSpeakerView,
      toggleActiveSpeakerView,
      passwordRequired,
      pttMode,
      togglePttMode,
      setPassword,
      roomId,
      currentPassword,
      allowInvites,
      allowShareScreen,
      allowWalkieTalkieMode,
    } = this.props;

    return (
      <Container>
        <RoomControls
          shouldShowPasswordModal={this.state.showPasswordModal}
          passwordRequired={passwordRequired}
          showPasswordModal={this.showPasswordModal}
          hidePasswordModal={this.hidePasswordModal}
          setPassword={setPassword}
          roomId={roomId}
          currentPassword={currentPassword}
          allowInvites={allowInvites}
        />
        <SidebarUserControls
          activeSpeakerView={activeSpeakerView}
          toggleActiveSpeakerView={toggleActiveSpeakerView}
          pttMode={pttMode}
          togglePttMode={togglePttMode}
          allowShareScreen={allowShareScreen}
          allowWalkieTalkieMode={allowWalkieTalkieMode}
        />
        <Roster roomAddress={roomAddress} />
        <SidebarLinks roomId={roomId} />
      </Container>
    );
  }

  private showPasswordModal = () => {
    this.setState({ showPasswordModal: true });
  };

  private hidePasswordModal = () => {
    this.setState({ showPasswordModal: false });
  };
}

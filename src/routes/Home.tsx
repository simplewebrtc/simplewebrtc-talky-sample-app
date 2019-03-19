import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CreateRoomInput from '../components/CreateRoomInput';
import { TalkyButton } from '../styles/button';
import './Home.css';

const StartChatButton = styled(TalkyButton)({
  marginLeft: '5px',
  padding: '10px',
  display: 'inline-block',
  backgroundColor: '#00b0e9',
  color: 'white',
  ':hover': {
    backgroundColor: '#009ed2',
    color: 'white'
  }
});

interface State {
  roomName: string;
}

class Home extends Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { roomName: '' };
  }

  public render() {
    return (
      <>
        <div className="container">
          <p>
            Truly simple video chat
            <br />
            and screen sharing for groups
          </p>
          <form className="create-room-form">
            <span className="create-room-form-input-wrapper">
              <span className="domain">yourdomain/</span>
              <CreateRoomInput
                roomName={this.state.roomName}
                onChange={this.onRoomNameChange}
              />
            </span>
            <StartChatButton onClick={this.joinRoom}>
              Start a chat
            </StartChatButton>
          </form>
          <footer>
            <a
              className="footer-logo"
              href="https://andyet.com"
              title="Made with love by &amp;yet"
              target="_blank"
              rel="noopener noreferrer"
            />
          </footer>
        </div>
      </>
    );
  }

  private joinRoom = () => {
    this.props.history.push(`/${this.state.roomName}`);
  };

  private onRoomNameChange = (roomName: string) => {
    this.setState({ roomName });
  };
}

export default withRouter(Home);

import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ThemeProvider from './components/ThemeProvider';
import Placeholders from './contexts/Placeholders';
import Room from './routes/Room';
import { PlaceholderGenerator } from './types';
import { colorToString, darken } from './utils/colorify';

const Container = styled.div`
  /* height: calc(var(--vh, 1vh) * 100);
  width: 100vw; */
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => colorToString(theme.background)};
  color: ${({ theme }) => colorToString(theme.foreground)};
  a {
    color: ${({ theme }) => colorToString(theme.primaryBackground)};
    :hover {
      color: ${({ theme }) => colorToString(darken(theme.primaryBackground, 0.1))};
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body, html {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #4d5659;
  }

  a {
    background-color: transparent;
    text-decoration: none;
  }

  button:hover {
    cursor: pointer;
  }
`;

interface RoomConfig {
  openToPublic: boolean;
  showHostVideo: boolean;
  showVisitorVideo: boolean;
  allowInvites: boolean;
  allowShareScreen: boolean;
  allowWalkieTalkieMode: boolean;
  allowChat: boolean;
}

interface Props {
  configUrl: string;
  userData?: string;
  roomName?: string;
  initialPassword?: string;
  roomConfig: RoomConfig;
}

class App extends Component<Props> {
  public render() {
    const {
      roomName,
      configUrl,
      userData,
      initialPassword,
      roomConfig,
    } = this.props;
    return (
      <ThemeProvider>
        <div style={{ height: "100%" }}>
          <GlobalStyle />
          <Container>
            {roomName ? (
              <Room
                name={roomName}
                configUrl={configUrl}
                userData={userData}
                initialPassword={initialPassword}
                roomConfig={roomConfig}
              />
            ) : (
              <div className="container">
                <form className="create-room-form" method="GET" action="/">
                  <span className="create-room-form-input-wrapper">
                    <span className="domain">localhost/</span>
                    <input
                      type="text"
                      name="room"
                      placeholder="choose a room name"
                      className="create-room-form-input"
                    />
                  </span>
                  <button
                    className="create-room-form-button button button-default button-undefined"
                    type="submit"
                  >
                    Start a chat
                  </button>
                </form>
              </div>
            )}
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

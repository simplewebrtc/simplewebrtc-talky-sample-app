import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ThemeProvider from './components/ThemeProvider';
import Placeholders from './contexts/Placeholders';
import Room from './routes/Room';
import { PlaceholderGenerator } from './types';
import { colorToString, darken } from './utils/colorify';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => colorToString(theme.background)};
  color: ${({ theme }) => colorToString(theme.foreground)};
  a {
    color: ${({ theme }) => colorToString(theme.primaryBackground)};
    :hover {
      color: ${({ theme }) =>
        colorToString(darken(theme.primaryBackground, 0.1))};
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

interface Props {
  configUrl: string;
  userData?: string;
  roomName?: string;
  gridPlaceholder: PlaceholderGenerator;
  haircheckHeaderPlaceholder: PlaceholderGenerator;
  emptyRosterPlaceholder: PlaceholderGenerator;
  homepagePlaceholder: PlaceholderGenerator;
}

class App extends Component<Props> {
  public render() {
    const {
      roomName,
      configUrl,
      userData,
      gridPlaceholder,
      haircheckHeaderPlaceholder,
      emptyRosterPlaceholder,
      homepagePlaceholder
    } = this.props;
    return (
      <ThemeProvider>
        <Placeholders.Provider
          value={{
            gridPlaceholder,
            haircheckHeaderPlaceholder,
            emptyRosterPlaceholder,
            homepagePlaceholder
          }}
        >
          <div>
            <GlobalStyle />
            <Container>
              {roomName ? (
                <Room
                  name={roomName}
                  configUrl={configUrl}
                  userData={userData}
                />
              ) : (
                <div
                  ref={node => {
                    if (
                      node &&
                      homepagePlaceholder &&
                      node.childElementCount === 0
                    ) {
                      const el = homepagePlaceholder();
                      if (el) {
                        node.appendChild(el);
                      }
                    }
                  }}
                />
              )}
            </Container>
          </div>
        </Placeholders.Provider>
      </ThemeProvider>
    );
  }
}

export default App;

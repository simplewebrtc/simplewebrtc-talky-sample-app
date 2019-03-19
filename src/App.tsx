import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './routes/Home';
import Room from './routes/Room';

const Container = styled.div({
  height: '100vh',
  width: '100vw'
});

interface Props {
  configUrl: string;
}

class App extends Component<Props> {
  public componentDidMount() {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = '//cloud.typography.com/7773252/661942/css/fonts.css';
    document.head!.appendChild(l);
  }
  public render() {
    return (
      <Router>
        <Container>
          <Route path="/" exact component={Home} />
          <Route
            path="/:roomName"
            render={props => (
              <Room {...props} configUrl={this.props.configUrl} />
            )}
          />
        </Container>
      </Router>
    );
  }
}

export default App;

import { Selectors, State } from '@andyet/simplewebrtc';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import styled from 'styled-components';

interface RecordingContainerProps {
  on?: boolean;
}
const RecordingStateLabel = styled.div<RecordingContainerProps>(({ on }) => ({
  color: on ? '#fff' : '#c30',
  background: on ? '#c30' : '#fff',
  border: '2px solid #c30',
  borderRadius: '2em',
  padding: '.25em',
  paddingLeft: '.5em',
  paddingRight: '.5em',
  fontWeight: 'bold'
}));
const RecordingToggle = styled.button<RecordingContainerProps>(({ on }) => ({
  color: on ? '#fff' : '#c30',
  background: on ? '#c30' : '#fff',
  border: '2px solid #c30',
  borderRadius: '2em',
  padding: '.25em',
  paddingLeft: '.5em',
  paddingRight: '.5em',
  fontWeight: 'bold'
}));

function startRecording(roomAddress: string): ThunkAction<void, State, void, any> {
  return (dispatch, getState) => {
    const client = Selectors.getClient(getState());
    if (client) {
      client.xmpp.sendIQ({
        to: roomAddress,
        type: 'set',
        mmuc: {
          startRecording: {}
        }
      });
    }
  };
}
function endRecording(roomAddress: string): ThunkAction<void, State, void, any> {
  return (dispatch, getState) => {
    const client = Selectors.getClient(getState());
    if (client) {
      client.xmpp.sendIQ({
        to: roomAddress,
        type: 'set',
        mmuc: {
          endRecording: {}
        }
      });
    }
  };
}
interface RecordingProps {
  roomAddress: string;
  start?: () => void;
  stop?: () => void;
  recordingActive?: boolean;
}
interface RecordingState {
  starting: boolean;
  ending: boolean;
}
function mapDispatchToProps(dispatch: any, props: RecordingProps): RecordingProps {
  return {
    ...props,
    start: () => dispatch(startRecording(props.roomAddress)),
    stop: () => dispatch(endRecording(props.roomAddress))
  };
}
function mapStateToProps(state: any, props: RecordingProps) {
  const peers = Selectors.getPeersForRoom(state, props.roomAddress).filter(
    peer => peer.customerData.isAHiddenBot
  );
  return {
    ...props,
    recordingActive: peers.length > 0
  };
}
export const RecordingControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class RecordingControls extends Component<RecordingProps, RecordingState> {
    constructor(props: RecordingProps) {
      super(props);
      this.state = {
        starting: false,
        ending: false
      };
    }
    public componentDidUpdate(prevProps: RecordingProps, prevState: RecordingState) {
      if (prevProps.recordingActive !== this.props.recordingActive) {
        if (this.props.recordingActive && prevState.starting) {
          this.setState({ starting: false });
        }
        if (!this.props.recordingActive && prevState.ending) {
          this.setState({ ending: false });
        }
      }
    }
    public render() {
      return (
        <RecordingToggle
          on={this.props.recordingActive}
          disabled={this.state.starting || this.state.ending}
          onClick={() => {
            if (!this.props.recordingActive) {
              this.setState({ starting: true });
              this.props.start!();
            } else {
              this.setState({ ending: true });
              this.props.stop!();
            }
          }}
        >
          {this.props.recordingActive
            ? this.state.ending
              ? 'Ending Recording...'
              : 'End Recording'
            : this.state.starting
            ? 'Starting Recording...'
            : 'Start Recording'}
        </RecordingToggle>
      );
    }
  }
);
export const RecordingIndicator = connect(mapStateToProps)(
  class RecordingIndicator extends Component<RecordingProps, RecordingState> {
    constructor(props: RecordingProps) {
      super(props);
      this.state = {
        starting: false,
        ending: false
      };
    }
    public componentDidUpdate(prevProps: RecordingProps, prevState: RecordingState) {
      if (prevProps.recordingActive !== this.props.recordingActive) {
        if (this.props.recordingActive && prevState.starting) {
          this.setState({ starting: false });
        }
        if (!this.props.recordingActive && prevState.ending) {
          this.setState({ ending: false });
        }
      }
    }
    public render() {
      return (
        <RecordingStateLabel on={this.props.recordingActive}>
          {this.props.recordingActive ? 'Recording On' : 'Recording Off'}
        </RecordingStateLabel>
      );
    }
  }
);

export const RecordingContainer =  ({ children }: { children: React.ReactElement }) => <div>{children}</div>;
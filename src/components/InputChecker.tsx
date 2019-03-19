import { Media, VolumeMeter } from '@andyet/simplewebrtc';
import React, { Component } from 'react';

interface RenderProps {
  detected: boolean;
  lost?: boolean;
}

interface Props {
  media: Media;
  render: (props: RenderProps) => React.ReactNode;
  threshold: number;
}

interface State {
  currentTime: number;
}

export default class InputChecker extends Component<Props, State> {
  private interval: number | null;

  constructor(props: Props) {
    super(props);
    this.state = { currentTime: 0 };
    this.interval = null;
  }

  public componentDidMount() {
    this.interval = window.setInterval(
      () => this.setState({ currentTime: Date.now() }),
      1000
    );
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval!);
  }

  public render() {
    const { media } = this.props;
    if (media.inputDetected) {
      if (
        media.inputLost &&
        new Date().getTime() - media.inputLost > this.props.threshold
      ) {
        return this.props.render({ detected: true, lost: true });
      }

      return this.props.render({ detected: true, lost: false });
    }

    return this.props.render({ detected: false });
  }
}

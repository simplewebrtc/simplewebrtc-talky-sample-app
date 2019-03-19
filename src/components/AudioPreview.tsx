import { Media, VolumeMeter } from '@andyet/simplewebrtc';
import React, { Component } from 'react';

interface AudioPreviewProps {
  audio: Media;
}

interface AudioPreviewState {
  currentTime: number;
}

export default class AudioPreview extends Component<
  AudioPreviewProps,
  AudioPreviewState
> {
  private interval: number | null;

  constructor(props: AudioPreviewProps) {
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
    const { audio } = this.props;
    if (audio.inputDetected) {
      if (audio.inputLost && new Date().getTime() - audio.inputLost > 7000) {
        return <p>Input lost.</p>;
      }

      return (
        <VolumeMeter
          media={audio}
          render={({ volume }) => <progress max="100" value={volume + 100} />}
        />
      );
    }

    return <p>No input detected.</p>;
  }
}

import {
  DeviceList,
  LocalMediaList,
  Media,
  RequestUserMedia
} from '@andyet/simplewebrtc';
import React, { Component } from 'react';

// CaptureControls renders DeviceSelectors and MediaPreviews, which allows a
// user to select their desired camera and microphone.

interface UserMediaIds {
  audio?: string;
  video?: string;
}

interface DeviceSelectorRenderProps {
  hasDevice?: boolean;
  permissionDenied?: boolean;
  requestingCapture?: boolean;
  requestPermissions?: () => Promise<UserMediaIds>;
  devices?: MediaDeviceInfo[];
  currentMedia?: Media;
  selectMedia?: (deviceId?: string) => void;
}

interface Props {
  kind: 'camera' | 'microphone';
  render: (props: DeviceSelectorRenderProps) => React.ReactNode;
}

interface State {
  mediaTypeDisabled: boolean;
}

export default class DeviceSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mediaTypeDisabled: false
    };
  }

  public render() {
    const { kind, render } = this.props;
    return (
      <DeviceList
        videoInput={kind === 'camera'}
        audioInput={kind === 'microphone'}
        render={({
          devices,
          hasCamera,
          cameraPermissionDenied,
          hasMicrophone,
          microphonePermissionDenied,
          requestingCameraCapture,
          requestingMicrophoneCapture,
          requestingCapture
        }) => {
          if (
            (kind === 'camera' && !hasCamera && !cameraPermissionDenied) ||
            (kind === 'microphone' &&
              !hasMicrophone &&
              !microphonePermissionDenied)
          ) {
            return render({ hasDevice: false });
          }

          if (
            (kind === 'camera' && cameraPermissionDenied) ||
            (kind === 'microphone' && microphonePermissionDenied)
          ) {
            return render({ permissionDenied: true });
          }

          if (
            (kind === 'camera' && requestingCameraCapture) ||
            (kind === 'microphone' && requestingMicrophoneCapture)
          ) {
            return render({ requestingCapture: true });
          }

          return (
            <LocalMediaList
              video={kind === 'camera'}
              audio={kind === 'microphone'}
              screen={false}
              render={({ media, removeMedia }) => {
                if (!devices.length || this.state.mediaTypeDisabled) {
                  return (
                    <RequestUserMedia
                      video={kind === 'camera'}
                      audio={kind === 'microphone'}
                      share={false}
                      render={getMedia => {
                        return render({
                          requestPermissions: () => {
                            this.setState({ mediaTypeDisabled: false });
                            return getMedia({
                              audio: kind === 'microphone',
                              video: kind === 'camera'
                            });
                          }
                        });
                      }}
                    />
                  );
                } else if (!media.length) {
                  return (
                    <RequestUserMedia
                      video={kind === 'camera'}
                      audio={kind === 'microphone'}
                      share={false}
                      render={getMedia => {
                        if (!requestingCapture) {
                          getMedia({
                            audio: kind === 'microphone',
                            video: kind === 'camera'
                          });
                        }
                        return null;
                      }}
                    />
                  );
                }

                const latestMedia = media[media.length - 1];
                return (
                  <RequestUserMedia
                    replaceVideo={
                      kind === 'camera' && latestMedia
                        ? latestMedia.id
                        : undefined
                    }
                    replaceAudio={
                      kind === 'microphone' && latestMedia
                        ? latestMedia.id
                        : undefined
                    }
                    share={false}
                    render={getMedia => {
                      return render({
                        currentMedia: latestMedia,
                        devices,
                        hasDevice: true,
                        selectMedia: deviceId => {
                          if (deviceId) {
                            if (this.state.mediaTypeDisabled) {
                              this.setState({ mediaTypeDisabled: false });
                            }
                            getMedia({
                              [kind === 'camera' ? 'video' : 'audio']: {
                                deviceId: { exact: deviceId }
                              }
                            });
                          } else {
                            this.setState({ mediaTypeDisabled: true }, () => {
                              for (const m of media) {
                                removeMedia!(m.id);
                              }
                            });
                          }
                        }
                      });
                    }}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }
}

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
  kind: 'video' | 'audio';
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
        videoInput={kind === 'video'}
        audioInput={kind === 'audio'}
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
            (kind === 'video' && !hasCamera && !cameraPermissionDenied) ||
            (kind === 'audio' && !hasMicrophone && !microphonePermissionDenied)
          ) {
            return render({ hasDevice: false });
          }

          if (
            (kind === 'video' && cameraPermissionDenied) ||
            (kind === 'audio' && microphonePermissionDenied)
          ) {
            return render({ permissionDenied: true });
          }

          if (
            (kind === 'video' && requestingCameraCapture) ||
            (kind === 'audio' && requestingMicrophoneCapture)
          ) {
            return render({ requestingCapture: true });
          }

          return (
            <LocalMediaList
              screen={false}
              render={({ media, removeMedia }) => {
                const videoStreams = media.filter(m => m.kind === 'video');
                const audioStreams = media.filter(m => m.kind === 'audio');
                const mediaForKind =
                  kind === 'video' ? videoStreams : audioStreams;
                const existingNonKindMedia =
                  kind === 'video' ? audioStreams : videoStreams;

                if (!devices.length || this.state.mediaTypeDisabled) {
                  return (
                    <RequestUserMedia
                      video={kind === 'video'}
                      audio={kind === 'audio'}
                      share={false}
                      render={getMedia => {
                        return render({
                          requestPermissions: () => {
                            this.setState({ mediaTypeDisabled: false });
                            return getMedia({
                              audio: kind === 'audio',
                              video: kind === 'video'
                            });
                          }
                        });
                      }}
                    />
                  );
                } else if (!mediaForKind.length) {
                  return (
                    <RequestUserMedia
                      replaceVideo={
                        videoStreams.length > 0
                          ? videoStreams[videoStreams.length - 1].id
                          : undefined
                      }
                      replaceAudio={
                        audioStreams.length > 0
                          ? audioStreams[audioStreams.length - 1].id
                          : undefined
                      }
                      share={false}
                      render={getMedia => {
                        if (!requestingCapture) {
                          const constraints: MediaStreamConstraints = {
                            audio:
                              kind === 'audio' ||
                              (kind === 'video' &&
                                existingNonKindMedia.length > 0),
                            video:
                              kind === 'video' ||
                              (kind === 'audio' &&
                                existingNonKindMedia.length > 0)
                          };
                          getMedia(constraints);
                        }
                        return null;
                      }}
                    />
                  );
                }

                const latestMedia = mediaForKind[mediaForKind.length - 1];
                const latestOtherMedia =
                  existingNonKindMedia[existingNonKindMedia.length - 1];
                return (
                  <RequestUserMedia
                    replaceVideo={
                      kind === 'video' && latestMedia
                        ? latestMedia.id
                        : latestOtherMedia
                        ? latestOtherMedia.id
                        : undefined
                    }
                    replaceAudio={
                      kind === 'audio' && latestMedia
                        ? latestMedia.id
                        : latestOtherMedia
                        ? latestOtherMedia.id
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
                            const getMediaOptions: MediaStreamConstraints = {
                              [kind === 'video' ? 'video' : 'audio']: {
                                deviceId: { exact: deviceId }
                              }
                            };
                            if (existingNonKindMedia.length > 0) {
                              getMediaOptions[existingNonKindMedia[0].kind] = {
                                deviceId: {
                                  exact: existingNonKindMedia[0].track.getSettings()
                                    .deviceId
                                }
                              };
                            }
                            getMedia(getMediaOptions);
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

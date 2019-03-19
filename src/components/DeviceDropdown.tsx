import { Media } from '@andyet/simplewebrtc';
import React from 'react';

interface Props {
  devices: MediaDeviceInfo[];
  currentMedia: Media;
  selectMedia: (deviceId?: string) => void;
}

const DeviceDropdown: React.SFC<Props> = ({
  currentMedia,
  devices,
  selectMedia
}) => (
  <select
    defaultValue=""
    onChange={e => {
      if (!e.target.value) {
        return;
      }
      if (e.target.value === 'disable') {
        selectMedia();
      }
      selectMedia(e.target.value);
    }}
  >
    {currentMedia && (
      <option>{currentMedia.track.label || 'Unknown Device'}</option>
    )}
    {currentMedia && <option>---</option>}
    {devices.map(device => (
      <option key={device.deviceId} value={device.deviceId}>
        {device.label}
      </option>
    ))}
    {currentMedia && <option>---</option>}
    {currentMedia && <option value="disable">Disable</option>}
  </select>
);

export default DeviceDropdown;

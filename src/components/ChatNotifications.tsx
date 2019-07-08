import { ChatGroup } from '@andyet/simplewebrtc';
import { Component } from 'react';

interface Props {
  groups: ChatGroup[];
  onSend: () => void;
  onReceive: () => void;
}

function messageCount(
  groups: ChatGroup[],
  direction: 'incoming' | 'outgoing'
): number {
  return groups
    .filter(g => g.direction === direction)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.chats.length;
    }, 0);
}

export default class PeerNotifications extends Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    const prevIncoming = messageCount(prevProps.groups, 'incoming');
    const incoming = messageCount(this.props.groups, 'incoming');
    const prevOutgoing = messageCount(prevProps.groups, 'outgoing');
    const outgoing = messageCount(this.props.groups, 'outgoing');

    if (prevIncoming < incoming) {
      this.props.onReceive();
    }

    if (prevOutgoing < outgoing) {
      this.props.onSend();
    }
  }

  public render() {
    return null;
  }
}

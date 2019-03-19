import { ChatComposers } from '@andyet/simplewebrtc';
import KeyboardArrowUpIcon from 'material-icons-svg/components/baseline/KeyboardArrowUp';
import MoreHorizIcon from 'material-icons-svg/components/baseline/MoreHoriz';
import React from 'react';
import styled from 'styled-components';

interface Props {
  roomAddress: string;
  onClick: () => void;
}

interface ContainerProps {
  isTyping: boolean;
}

const Container = styled.button((props: ContainerProps) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '16.6667%',
  textAlign: 'left',
  zIndex: 300,
  fontSize: '18px',
  border: '1px #e9ecec solid',
  background: 'white',
  padding: '5px 15px',
  '&:focus': {
    outline: 0
  },
  '& svg': {
    fill: 'rgb(77, 86, 89)',
    fontSize: '24px',
    verticalAlign: 'middle',
    '&:last-of-type': {
      marginLeft: '8px',
      opacity: props.isTyping ? 1 : 0
    }
  }
}));

const ChatToggle: React.SFC<Props> = ({ roomAddress, onClick }) => (
  <ChatComposers
    room={roomAddress}
    render={({ composers }) => (
      <Container onClick={onClick} isTyping={composers.length > 0}>
        <KeyboardArrowUpIcon />
        <span>Chat</span>
        <MoreHorizIcon />
      </Container>
    )}
  />
);

export default ChatToggle;

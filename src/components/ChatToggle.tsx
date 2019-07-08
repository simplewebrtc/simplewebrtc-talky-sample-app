import { ChatComposers, ChatList } from '@andyet/simplewebrtc';
import KeyboardArrowUpIcon from 'material-icons-svg/components/baseline/KeyboardArrowUp';
import MoreHorizIcon from 'material-icons-svg/components/baseline/MoreHoriz';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { colorToString } from '../utils/colorify';
import ChatNotifications from './ChatNotifications';

interface Props {
  roomAddress: string;
  onClick: () => void;
}

interface ContainerProps {
  isTyping: boolean;
  newMessage: boolean;
}

const Container = styled.button<ContainerProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16.6667%;
  text-align: left;
  z-index: 300;
  font-size: 18px;
  border: ${({ newMessage, theme }) =>
    newMessage
      ? css`1px ${colorToString(theme.buttonActionBackground)} solid`
      : css`1px solid ${colorToString(theme.border)}`};
  background: ${({ newMessage, theme }) =>
    newMessage
      ? colorToString(theme.buttonActionBackground)
      : colorToString(theme.background)};
  color: ${({ newMessage, theme }) =>
    newMessage
      ? colorToString(theme.buttonActionText)
      : colorToString(theme.foreground)};
  padding: 5px 15px;
  :focus {
    outline: 0;
  }
  svg {
    fill: ${({ newMessage, theme }) =>
      newMessage
        ? colorToString(theme.buttonActionText)
        : colorToString(theme.foreground)};
    font-size: 24px;
    vertical-align: middle;
    :last-of-type {
      margin-left: 8px;
      opacity: ${({ isTyping }) => (isTyping ? 1 : 0)};
    }
  }
`;

const ChatToggle: React.SFC<Props> = ({ roomAddress, onClick }) => {
  const [newMessage, setNewMessage] = useState(false);
  return (
    <ChatList
      room={roomAddress}
      render={({ groups }) => (
        <>
          <ChatComposers
            room={roomAddress}
            render={({ composers }) => (
              <Container
                onClick={onClick}
                isTyping={composers.length > 0}
                newMessage={newMessage}
              >
                <KeyboardArrowUpIcon />
                <span>Chat</span>
                <MoreHorizIcon />
              </Container>
            )}
          />
          <ChatNotifications
            groups={groups}
            onSend={() => null}
            onReceive={() => setNewMessage(true)}
          />
        </>
      )}
    />
  );
};

export default ChatToggle;

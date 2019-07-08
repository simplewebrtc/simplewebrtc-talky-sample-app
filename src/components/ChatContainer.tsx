import {
  Chat,
  ChatComposers,
  ChatInput,
  ChatList,
  Peer,
  StayDownContainer
} from '@andyet/simplewebrtc';
import KeyboardArrowDownIcon from 'material-icons-svg/components/baseline/KeyboardArrowDown';
import React from 'react';
import styled, { css } from 'styled-components';
import mq from '../styles/media-queries';
import { colorToString } from '../utils/colorify';
import emojify from '../utils/emojify';
import Linkify from './Linkify';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  max-height: 100vh;
  border-top: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  z-index: 300;
  background-color: ${({ theme }) => colorToString(theme.background)};
  overflow: hidden;
  ${mq.SMALL_DESKTOP} {
    width: 200px;
    border-top: none;
    border-left: ${({ theme }) =>
      css`1px solid ${colorToString(theme.border)}`};
  }
`;

// const staydownContainerClass = css`
//   flex: 1;
//   overflow: scroll;
//   height: 0px; /* This is important to get Flexbox to overflow properly. */
//   margin-bottom: 16px;
// `;

const Header = styled.button`
  border: none;
  border-top: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  border-bottom: ${({ theme }) =>
    css`1px solid ${colorToString(theme.border)}`};
  display: block;
  padding: 10px;
  font-size: 18px;
  outline: none;
  background-color: ${({ theme }) => colorToString(theme.background)};
  :active {
    border-style: solid;
  }
  svg {
    fill: ${({ theme }) => colorToString(theme.foreground)};
    vertical-align: middle;
    font-size: 20px;
    margin-right: 5px;
  }
`;

const StyledStayDownContainer = styled(StayDownContainer)({
  flex: 1,
  overflow: 'scroll',
  height: '0px',
  marginBottom: '16px'
});

const InputContainer = styled.div`
  textarea {
    width: 100%;
    height: 90px;
    min-height: 0;
    padding: 8px;
    margin: 0;
    outline: none;
    border: none;
    border-top: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
    display: block;
    font-size: 14px;
    font-family: inherit;
    resize: none;
  }
  input {
    margin-right: 5px;
  }
  label {
    font-size: 12px;
  }
`;

const Message = styled.div`
  border-bottom: ${({ theme }) =>
    css`1px solid ${colorToString(theme.border)}`};
  position: relative;
  padding: 10px;
  font-size: 14px;
  p {
    margin: 0;
  }
`;

const MessageAuthor = styled.p({
  fontWeight: 'bold'
});

const MessageTime = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${({ theme }) => colorToString(theme.foreground)};
  font-size: 12px;
`;

const MessageText = styled.p({
  wordBreak: 'break-all'
});

interface ChatMessageGroupProps {
  chats: Chat[];
  peer: Peer | undefined;
}

const ChatMessageGroup: React.SFC<ChatMessageGroupProps> = ({
  chats,
  peer
}) => (
  <Message key={chats[0].id}>
    <MessageAuthor>
      {chats[0].displayName ? chats[0].displayName : 'Anonymous'}
    </MessageAuthor>
    <MessageTime>{chats[0].time.toLocaleTimeString()}</MessageTime>
    {chats.map(message => (
      <MessageText key={message.id}>
        <Linkify text={emojify(message.body)} />
      </MessageText>
    ))}
  </Message>
);

const ComposersContainer = styled.div({
  minHeight: '30px'
});

interface Props {
  roomAddress: string;
  sendRtt: boolean;
  toggleRtt: () => void;
  toggleChat: () => void;
}

// ChatContainer renders all the UI for the chat room inside a Room. It
// includes a message display embedded inside a StayDownContainer so that
// it remains scrolled to the bottom, a ChatInput to type messages, and a
// text element that displays currently typing peers.
const ChatContainer: React.SFC<Props> = ({
  roomAddress,
  sendRtt,
  toggleRtt,
  toggleChat
}) => (
  <Container>
    <Header onClick={toggleChat}>
      <KeyboardArrowDownIcon />
      <span>Chat</span>
    </Header>
    <StyledStayDownContainer>
      <ChatList
        room={roomAddress}
        renderGroup={({ chats, peer }) => (
          <ChatMessageGroup key={chats[0].id} chats={chats} peer={peer} />
        )}
      />
    </StyledStayDownContainer>
    <InputContainer>
      <ChatInput
        room={roomAddress}
        rtt={sendRtt}
        placeholder="Send a message..."
      />
      <label style={{ display: 'block' }}>
        <input type="checkbox" checked={sendRtt} onChange={toggleRtt} />
        Send as I type
      </label>
      <ComposersContainer>
        <ChatComposers room={roomAddress} />
      </ComposersContainer>
    </InputContainer>
  </Container>
);

export default ChatContainer;

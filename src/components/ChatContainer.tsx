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
import styled from 'styled-components';
import mq from '../styles/media-queries';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '50vh',
  borderTop: '1px #e9ecec solid',
  zIndex: 300,
  backgroundColor: 'white',
  [mq.SMALL_DESKTOP]: {
    width: '200px',
    borderTop: 'none',
    borderLeft: '1px #e9ecec solid'
  }
});

// const staydownContainerClass = css`
//   flex: 1;
//   overflow: scroll;
//   height: 0px; /* This is important to get Flexbox to overflow properly. */
//   margin-bottom: 16px;
// `;

const Header = styled.button({
  border: '1px #e9ecec solid',
  display: 'block',
  padding: '10px',
  fontSize: '18px',
  outline: 'none',
  backgroundColor: 'white',
  '&:active': {
    borderStyle: 'solid'
  },
  '& svg': {
    verticalAlign: 'middle',
    fontSize: '20px',
    marginRight: '5px'
  }
});

const StyledStayDownContainer = styled(StayDownContainer)({
  flex: 1,
  overflow: 'scroll',
  height: '0px',
  marginBottom: '16px'
});

const InputContainer = styled.div({
  '& textarea': {
    width: '100%',
    height: '90px',
    minHeight: 0,
    padding: '8px',
    margin: 0,
    outline: 'none',
    border: 'none',
    borderTop: '1px #e9ecec solid',
    display: 'block',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'none'
  },
  '& input': {
    marginRight: '5px'
  },
  '& label': {
    fontSize: '12px'
  }
});

const Message = styled.div({
  borderBottom: '1px #e9ecec solid',
  position: 'relative',
  padding: '10px',
  fontSize: '14px',
  '& p': {
    margin: 0
  }
});

const MessageAuthor = styled.p({
  fontWeight: 'bold'
});

const MessageTime = styled.span({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#848d90',
  fontSize: '12px'
});

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
      <MessageText key={message.id}>{message.body}</MessageText>
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
          <ChatMessageGroup chats={chats} peer={peer} />
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

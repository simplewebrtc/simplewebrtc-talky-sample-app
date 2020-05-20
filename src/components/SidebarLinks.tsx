import React from 'react';
import styled from 'styled-components';
import { colorToString, lighten } from '../utils/colorify';
import getConfigFromMetaTag from '../utils/metaConfig';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  padding: 10px 0;
  color: ${({ theme }) => colorToString(theme.foreground)};
  a {
    color: ${({ theme }) => colorToString(theme.foreground)} !important;
    padding: 0 15px;
    font-size: 14px;
    text-decoration: none;
    :hover {
      color: ${({ theme }) => colorToString(lighten(theme.foreground, 0.05))} !important;
    }
  }
`;

interface Props {
  roomId: string;
}

const SidebarLinks: React.SFC<Props> = ({ roomId }) => {
  const helpUrl = getConfigFromMetaTag('help-url');
  const feedbackUrl = getConfigFromMetaTag('feedback-url');
  if (helpUrl && feedbackUrl) {
    const parsedFeedbackUrl = new URL(feedbackUrl);
    parsedFeedbackUrl.searchParams.set('room', roomId);
    return (
      <Container>
        <a href={helpUrl} target="_blank" rel="noopener noreferrer">
          Help
        </a>{' '}
        ∙{' '}
        <a href={parsedFeedbackUrl.toString()} target="_blank" rel="noopener noreferrer">
          Feedback
        </a>
      </Container>
    );
  }

  return null;
};

export default SidebarLinks;

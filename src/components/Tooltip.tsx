import InfoIcon from 'material-icons-svg/components/baseline/Info';
import React, { useState } from 'react';
import styled from 'styled-components';
import { colorToString } from '../utils/colorify';

const Container = styled.span`
  margin-left: auto !important;
  display: inline-block;
  line-height: 0px;
  font-size: 16px;
  position: relative;
  svg {
    fill: ${({ theme }) => colorToString(theme.foreground)};
    :hover {
      fill: ${({ theme }) => colorToString(theme.primaryBackground)};
    }
  }
`;

const Triangle = styled.span({
  position: 'absolute',
  top: '23px',
  left: '-1px',
  width: 0,
  height: 0,
  borderLeft: '10px solid transparent',
  borderRight: '10px solid transparent',
  borderBottom: '10px solid black',
  zIndex: 1
});

const Text = styled.span({
  visibility: 'visible',
  fontSize: '11px',
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  padding: '5px 0',
  borderRadius: '3px',
  whiteSpace: 'normal',
  position: 'absolute',
  width: '140px',
  top: '30px',
  left: '-23px',
  lineHeight: 'normal',
  zIndex: 1
});

interface Props {
  text: string;
}

const Tooltip: React.SFC<Props> = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const toggleTooltip = () => setShowTooltip(!showTooltip);
  return (
    <Container onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
      {showTooltip && (
        <span>
          <Triangle />
          <Text>{text}</Text>
        </span>
      )}
      <InfoIcon />
    </Container>
  );
};

export default Tooltip;

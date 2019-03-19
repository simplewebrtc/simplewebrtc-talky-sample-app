import ErrorIcon from 'material-icons-svg/components/baseline/Error';
import InfoIcon from 'material-icons-svg/components/baseline/Info';
import React from 'react';
import styled from 'styled-components';

const alertBase = {
  border: '1px solid black',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
  padding: '2px',
  '& svg': {
    marginRight: '5px'
  }
};

const ErrorContainer = styled.div({
  ...alertBase,
  backgroundColor: '#ffe6ed',
  borderColor: '#e60045',
  color: '#e60045',
  '& svg': {
    fill: '#e60045'
  }
});

const InfoContainer = styled.div({
  ...alertBase,
  backgroundColor: '#e6f9ff',
  borderColor: '#00b0eb',
  color: '#00b0eb',
  '& svg': {
    fill: '#00b0eb'
  }
});

export const Error: React.SFC = props => (
  <ErrorContainer>
    <ErrorIcon />
    {props.children}
  </ErrorContainer>
);

export const Info: React.SFC = props => (
  <InfoContainer>
    <InfoIcon />
    {props.children}
  </InfoContainer>
);

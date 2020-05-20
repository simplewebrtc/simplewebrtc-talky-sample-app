import ErrorIcon from 'material-icons-svg/components/baseline/Error';
import InfoIcon from 'material-icons-svg/components/baseline/Info';
import React from 'react';
import styled, { css } from 'styled-components';
import { colorToString } from '../utils/colorify';

const Container = styled.div`
  border: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 10px;
  padding: 2px;
  svg {
    margin-right: 5px;
    fill: ${({ theme }) => colorToString(theme.foreground)};
  }
`;

const ErrorContainer = styled(Container)`
  background-color: ${({ theme }) => colorToString(theme.alertErrorBackground)};
  border-color: ${({ theme }) => colorToString(theme.alertErrorForeground)};
  color: ${({ theme }) => colorToString(theme.alertErrorForeground)};
  svg {
    fill: ${({ theme }) => colorToString(theme.alertErrorForeground)};
  }
`;

const InfoContainer = styled(Container)`
  background-color: ${({ theme }) => colorToString(theme.alertInfoBackground)};
  border-color: ${({ theme }) => colorToString(theme.alertInfoForeground)};
  color: ${({ theme }) => colorToString(theme.alertInfoForeground)};
  svg {
    fill: ${({ theme }) => colorToString(theme.alertInfoForeground)};
  }
`;

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

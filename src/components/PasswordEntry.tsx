import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { TalkyButton } from '../styles/button';
import { colorToString } from '../utils/colorify';

const Container = styled.div`
  text-align: center;
  h2 {
    font-size: 36px;
    font-weight: 300;
    color: ${({ theme }) => colorToString(theme.foreground)};
  }
  input {
    display: block;
    padding: 7px;
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 3px;
    border: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
    margin-bottom: 10px;
  }
  button {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const SubmitButton = styled(TalkyButton)`
  color: ${({ theme }) => colorToString(theme.buttonActionText)};
  background-color: ${({ theme }) =>
    colorToString(theme.buttonActionBackground)};
  :hover {
    background-color: ${({ theme }) =>
      colorToString(theme.buttonActionBackgroundHover)};
  }
  :active {
    background-color: ${({ theme }) =>
      colorToString(theme.buttonActionBackgroundActive)};
  }
`;

const CancelButton = styled(TalkyButton)({
  marginRight: '10px'
});

interface Props {
  setPassword: (s: string) => void;
  setting: boolean;
  passwordIsIncorrect?: boolean;
  onSubmit?: () => void;
}

interface State {
  password: string;
}

export default class PasswordEntry extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { password: '' };
  }

  public render() {
    return (
      <Container>
        <h2>
          {this.props.setting
            ? 'Set a key for this room'
            : 'A password is required to enter this room'}
        </h2>
        {this.props.passwordIsIncorrect && (
          <p>The password you entered is incorrect. Please try again.</p>
        )}
        <input
          type="password"
          placeholder="Your shared key"
          value={this.state.password}
          onChange={this.onChange}
        />
        <CancelButton onClick={this.props.onSubmit}>Cancel</CancelButton>
        <SubmitButton onClick={this.onClick}>
          {this.props.setting ? 'Lock' : 'Join'}
        </SubmitButton>
      </Container>
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  private onClick = () => {
    this.props.setPassword(this.state.password);

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };
}

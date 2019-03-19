import React, { Component } from 'react';
import styled from 'styled-components';
import { TalkyButton } from '../styles/button';

const Container = styled.div({
  textAlign: 'center',
  '& h2': {
    fontSize: '36px',
    fontWeight: 300
  },
  '& input': {
    display: 'block',
    padding: '7px',
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
    borderRadius: '3px',
    border: '1px solid #e6eaed',
    marginBottom: '10px'
  },
  '& button': {
    paddingLeft: '8px',
    paddingRight: '8px'
  }
});

const SubmitButton = styled(TalkyButton)({
  color: 'white',
  backgroundColor: '#44bb70',
  ':hover': {
    backgroundColor: '#369658'
  }
});

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

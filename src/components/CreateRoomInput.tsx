import React, { Component } from 'react';
import randomRoomName from '../utils/randomRoomName';

interface Props {
  roomName: string;
  onChange: (s: string) => void;
}

interface State {
  isUserDefined: boolean;
}

export default class CreateRoomInput extends Component<Props, State> {
  private _input: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);

    this._input = React.createRef();

    this.state = {
      isUserDefined: false
    };
  }

  public componentDidMount() {
    this._input.current!.focus();
  }

  public render() {
    return (
      <input
        ref={this._input}
        className="create-room-form-input"
        type="text"
        value={this.props.roomName}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        placeholder="choose a room name"
      />
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    this.setState({
      isUserDefined: !!value
    });
    this.props.onChange(value);
  };

  private handleBlur = () => {
    if (this.props.roomName.trim() === '') {
      this.setState({
        isUserDefined: false
      });
      this.props.onChange(randomRoomName());
    }
  };

  private handleFocus = () => {
    if (!this.state.isUserDefined) {
      this.props.onChange('');
    }
  };
}

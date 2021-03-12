import React from 'react';

const Homepage = () => (
  <div className="container">
    <form className="create-room-form" method="GET" action="/">
      <span className="create-room-form-input-wrapper"
        ><span className="domain">localhost/</span
        ><input
          type="text"
          name="room"
          placeholder="choose a room name"
          className="create-room-form-input"/></span
      ><button
        className="create-room-form-button button button-default button-undefined"
        type="submit"
      >
        Start a chat
      </button>
    </form>
  </div>
)

export default Homepage;
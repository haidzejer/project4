import React, { Component } from 'react';
// import { Socket } from 'socket.io-client/dist/socket.io';

// const uri = 'http://localhost:3000';
// const options = { transports: ['websocket'] };

class Chat extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      messages: []
    }
  }
  // this.socket.on()

  render() {
    const socket = this.props.socket
    socket.emit('test', "emitting message from chat component")
    return (
      <h1>I am useless</h1>
    )
  }
}

export default Chat

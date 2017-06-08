import React, { Component } from 'react';
import { Socket } from 'react-socket-io';

const uri = 'http://localhost';
const options = { transports: ['websocket'] };

class Chat extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      messages: []
    }
  }

  render() {
    return (
      
    )
  }
}

export default Otaku

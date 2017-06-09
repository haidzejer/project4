import React, { Component } from 'react';

class Chat extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      messages: ["Welcome to the Chat"]
    }
  }

  _sendMessage(evt){
    // console.log(this.refs.message.value)
    const socket = this.props.socket
    var message = this.refs.message.value
    socket.emit('chat-message', message)
    console.log(this.state.messages)
    this.refs.message.value = ''
  }

  render() {
    const socket = this.props.socket
    socket.on("new-message", (message) => {
      console.log(message)
      this.setState({
        messages: [
          message,
          ...this.state.messages
        ]
      })
    })
    // socket.emit('test', "emitting message from chat component")
    console.log(this.state)
    return (
      <div id="chat-container">
        <div id="project-manger-is-stupid">
          <h1>I think it's working!!!</h1>
          <p id="hi">{this.state.messages}</p>
        </div>
        <input id="input" ref="message" type="text" />
        <button id="send-message" onClick={this._sendMessage.bind(this)} required='true'>Send your bitch ass message</button>
      </div>
    )
  }
}

export default Chat

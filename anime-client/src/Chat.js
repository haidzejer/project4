import React, { Component } from 'react';
import clientAuth from './clientAuth';

class Chat extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      messages: [{text: "Welcome to the Chat!", user:{name: "Otaku Finder", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtt_oqkINgHiwIzQKrQIicYYq1Mecd6NNVTKQAAHRWhC5tC_QM"}}]
    }
  }

  componentDidMount() {
    const socket = this.props.socket
    socket.on("new-message", (message) => {
      this.setState({
        messages: [
          message,
          ...this.state.messages
        ]
      })
    })
  }

  _sendMessage(evt){
    // console.log(this.refs.message.value)
    const socket = this.props.socket
    var message = {text: this.refs.message.value, user: clientAuth.getCurrentUser()}
    socket.emit('chat-message', message)
    this.refs.message.value = ''
  }

  render() {
    const messages = this.state.messages.map((m,i) => {
      return <li key={i} className="message"><p><img className="chatPic" src={m.user.profilePicture}/></p><span>{m.user.name}:  </span><span>{m.text}</span></li>
    })

    // socket.emit('test', "emitting message from chat component")
    return (
      <div id="chat-container">
        <h2>Global Chat</h2>
        <div id="project-manger-is-stupid">
          <div className="chatBox">
            <ul className="messages">
              {messages}
            </ul>
          </div>
        </div>
        <input id="input" ref="message" placeholder="Type a message here..." type="text" />
        <button id="send-message" onClick={this._sendMessage.bind(this)} required='true'>Send your bitch ass message</button>
      </div>
    )
  }
}

export default Chat

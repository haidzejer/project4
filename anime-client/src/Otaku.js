import React, {Component} from 'react';
import Map from './Map'
import Chat from './Chat'

class Otaku extends Component {

  render() {
    return (
      <div>
          <Map />
          <div className="chat-col">
            <Chat socket={this.props.socket} />
          </div>
      </div>
    )
  }
}

export default Otaku

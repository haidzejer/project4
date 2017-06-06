import React, {Component} from 'react'
import clientAuth from './clientAuth'

class EditUser extends Component {

  _editUser(evt){
    evt.preventDefault()
    const currentUser = clientAuth.getCurrentUser()
    console.log(currentUser)
    this.setState({
      view: 'home'
    })
  }

  render() {
    const currentUser = clientAuth.getCurrentUser()
    return (
      <div className="container">
        <h2>HELLO THERE, Time to change yourself</h2>
        <form onSubmit={this._editUser.bind(this)}>
          <input type='text' placeholder="Name" value={currentUser.name}/>
          <input type='text' placeholder="Email" value={currentUser.email}/>
          <button type='submit'>Edit yourself</button>
        </form>
      </div>
    )
  }

}

export default EditUser

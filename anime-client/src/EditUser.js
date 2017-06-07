import React, {Component} from 'react'
import clientAuth from './clientAuth'

class EditUser extends Component {

  constructor(){
    super()
    this.state = {
      currentUser: {name: '', email: ''}
    }
  }

  _handleInputChange(evt){
    console.log(evt.target)
    var edittingUser = this.state.currentUser
    edittingUser[evt.target.name] = evt.target.value

    this.setState({currentUser: edittingUser})
  }

  _editUser(evt){
    evt.preventDefault()
    const id = clientAuth.getCurrentUser()._id
    const editUser = {
      _id: id,
      name: this.refs.name.value,
      email: this.refs.email.value
    }
    clientAuth.editUser(editUser)
    this.setState({
      currentUser: {name: '', email: ''}
    })
  }

  render() {
    console.log(this.state);
    const currentUser = clientAuth.getCurrentUser()
    return (
      <div className="container">
        <h2>HELLO THERE, Time to change yourself</h2>
        <form onSubmit={this._editUser.bind(this)}>
          <label>Name
          <input name="name" type='text' placeholder="Name" ref='name'
            onChange={this._handleInputChange.bind(this)} value={this.state.edittingUser.name} />
          </label>
          <label>Email
          <input name="email" type='text' placeholder="Email" ref="email" onChange={this._handleInputChange.bind(this)} value={currentUser.email} />
        </label>
          <button type='submit'>Edit yourself</button>
        </form>
      </div>
    )
  }

}

export default EditUser
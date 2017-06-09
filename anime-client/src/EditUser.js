import React, {Component} from 'react'
import clientAuth from './clientAuth'

class EditUser extends Component {

  constructor(){
    super()
    const currentUser = clientAuth.getCurrentUser()
    this.state = {
      currentUser: currentUser
    }
  }

  _handleInputChange(evt){
    var edittingUser = this.state.currentUser
    edittingUser[evt.target.name] = evt.target.value

    this.setState({currentUser: edittingUser})
  }

  _editUser(evt){
    evt.preventDefault()
    const id = clientAuth.getCurrentUser()._id
    var editUser = {
      _id: id,
      name: this.refs.name.value,
      email: this.refs.email.value,
      profilePicture: this.refs.profilePicture.value,
      bio: this.refs.bio.value
    }
    clientAuth.editUser(editUser).then(res => {
      this.setState({
        currentUser: editUser
      })
      this.props.onClick()
    })
  }

  render() {
    return (
      <div className="container">
        <h2>HELLO THERE, Time to change yourself</h2>
        <form onSubmit={this._editUser.bind(this)}>
          <label className="col-1"><span>Name </span>
          <input className="col-2" name="name" type='text' placeholder="Name" ref='name'
            onChange={this._handleInputChange.bind(this)} value={this.state.currentUser.name} /><br/>
          </label>
          <label className="col-1"><span>Email </span>
          <input className="col-2" name="email" type='text' placeholder="Email" ref="email" onChange={this._handleInputChange.bind(this)} value={this.state.currentUser.email} /><br/>
          </label>
          <label className="col-1"><span>Picture </span>
          <input className="col-2" name="profilePicture" type='text' placeholder="Profile picture url..." ref="profilePicture" onChange={this._handleInputChange.bind(this)} value={this.state.currentUser.profilePicture} /><br/>
          </label>
          <label className="col-1"><span>Bio </span>
          <textarea className="col-2" name="bio" type='text' placeholder="Short personal description" ref="bio" onChange={this._handleInputChange.bind(this)} value={this.state.currentUser.bio} /><br/>
          </label>
          <button className="editUser" type='submit'>Update your bitch ass</button>
        </form>
      </div>
    )
  }

}

export default EditUser

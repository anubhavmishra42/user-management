import React, { Component } from 'react';
import './App.css';
// import User from './User/User';

class App extends Component {
  state = {
    Users: [{ name: 'anubhav', gender: 'male', age: 23 }, { name: 'ankit', gender: 'male', age: 25 }],
    searchUser: [],
    inUser: '',
    deleteUserState: '',
    AddedUser:""
  }
  addUser = () => {
    let arr = [...this.state.Users]
    const getdata = async () => {
      const res = await fetch('https://randomuser.me/api/?inc=gender,name,dob&noinfo')
      const data = await res.json()
      const { dob, gender, name } = data.results[0];
      arr.push({ name: name.first, gender: gender, age: dob.age })
      this.setState({AddedUser:data.results[0].name.first})
      this.setState({ Users: arr })
    }
    getdata();
  }
  deleteUserIn = (event) => {
    this.setState({ deleteUserState: event.target.value })
  }
  searchUserIn = (event) => {
    this.setState({ inUser: event.target.value })
  }

  deleteUser = () => {

    let arr = [...this.state.Users]
    // const name=prompt('Name');
    // console.log(this.state.deleteUser);
    const narr = arr.filter(item => {
      return item.name !== this.state.deleteUserState;
    })
    if (narr.length < arr.length) this.setState({ Users: narr })
    else alert("User not found ")
  }

  searchUser = () => {
    let arr = [...this.state.Users]
    // const name=prompt('Name');
    const narr = arr.filter(item => {
      return item.name === this.state.inUser;
    })
    let nFound = [{ name: 'User not available' }]
    if (narr.length) this.setState({ searchUser: narr })
    else (this.setState({ searchUser: nFound }))
  }
  render() {
    let markup = this.state.Users.map((item) => {
      return item.name
    }).join(' ')
    let sUser = this.state.searchUser.map(item => {
      return item.name
    }).join(" ");
    return (
      <div className="App">
        <h1>User Management</h1>
        <div className="addUser">
          <p>User added -- "{this.state.AddedUser}"</p>

         <button className="buttons" type="button" onClick={this.addUser}>Add user</button>

        </div>
        <div className="deleteUser">
          <input type="text" placeholder="enter name of user to delete" value={this.state.deleteUserState} onChange={this.deleteUserIn} />
          <button className="button-delete" type="button" onClick={this.deleteUser}>Delete User</button>
        </div>
        <div className="searchUser">
          <input type="text" placeholder="enter name of user to search" value={this.state.inUser} onChange={this.searchUserIn} />
          <button className="button-search" type="button" onClick={this.searchUser}>Search User</button>
        </div>
        <p>
        Current users are -- {markup}<br /><br />
        The searched user is -- {sUser}<br /><br />
        The deleted user is  -- {this.state.deleteUserState}

        </p>

      </div>
    );
  }
}

export default App;

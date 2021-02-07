import React, { Component } from 'react';
import './App.css';
// import User from './User/User';

class App extends Component {
  state = {
    Users: [{ name: 'anubhav', gender: 'male', age: 23 }, { name: 'ankit', gender: 'male', age: 25 }],//state for the users to be added 
    searchUser: [],//this property on state was created to maintain a search record for user
    inUser: '', //this property on state was created to maintain a record for input text in input box
    deleteUserState: '',//this property on state is there to key record for deleted user
    AddedUser:""//this property on state is used to render the first name of added user
  }
  //addUser -- This function is used to fetch the data from api. I have requested only limited data from api in inc fields for this
  //        -- After fetching the data, the state is updated 
  addUser = () => {
    let arr = [...this.state.Users]
    const getdata = async () => {
      const res = await fetch('https://randomuser.me/api/?inc=gender,name,dob&noinfo')
      const data = await res.json()
      const { dob, gender, name } = data.results[0];
      arr.push({ name: name.first, gender: gender, age: dob.age })
      this.setState({AddedUser:data.results[0].name.first})
      this.setState({ Users: arr })//All the users are added here
    }
    getdata();
  }
  //deleteUserIn func is defined to update the state for input field for input box for delete users
  deleteUserIn = (event) => {
    this.setState({ deleteUserState: event.target.value })
  }
  //searchUserIn func is defined to update the state for input field for input box for user searched
  searchUserIn = (event) => {
    this.setState({ inUser: event.target.value })
  }
  //this function filter out the desired user entered and returns an array excluding the user which had to be deleted
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
//this function searches for the user from input box and shows the same in the results section by returning that user in the array
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
  //render func to render the html element on screen
  render() {
    // markup - this returns iteration on every element in array of users and joins them making a string with separated by a space(" ").
    let markup = this.state.Users.map((item) => {
      return item.name
    }).join(' ')
    // sUser - this returns iteration on every element in array of users and joins the users with same name property separated by space. 
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

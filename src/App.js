import React, { Component } from 'react';
import './App.css';
import User from './User/User';

class App extends Component {
  state = {
    Users: [],//state for the users to be added 
    searchUser: [],//this property on state was created to maintain a search record for user
    inUser: '', //this property on state was created to maintain a record for input text in input box
    deleteUserState: '',//this property on state is there to key record for deleted user
    searchResult: ""//this property on state is used to render the first name of added user
  }
  //addUser -- This function is used to fetch the data from api. I have requested only limited data from api in inc fields for this
  //        -- After fetching the data, the state is updated 
  addUser = () => {
    let arr = [...this.state.Users]
    const getdata = async () => {
      const res = await fetch('https://randomuser.me/api/?inc=gender,name,picture,location,dob&noinfo')
      const data = await res.json()
      const { dob, gender, name, picture,location } = data.results[0];
      arr.push({
         fName: name.first,
         lName: name.last,
         gender: gender, 
         age: dob.age ,
         picture:picture.thumbnail, 
         city:location.city,
         State:location.state,
         streetName:location.street.name,
         streetNum:location.street.number,
         delete:'No'
        })

      this.setState({ Users: arr })
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
  deleteUser = (event) => {
    let arr = [...this.state.Users]
    let wee=event.target.parentNode.innerText.split(" ");
    const narr = arr.filter(item => {
      return item.fName !== wee[0];
    })
    if (narr.length < arr.length) this.setState({ Users: narr })
    else alert("User not found ")
  }
  //this function searches for the user from input box and shows the same in the results section by returning that user in the array
  searchUser = () => {
    let arr = [...this.state.Users]
    const narr = arr.filter(item => {
      return item.fName === this.state.inUser;
    })
    console.log(this.state.inUser)
    if (narr.length) {this.setState({searchResult:"f" })
    this.setState({ searchUser: narr })}
    else this.setState({searchResult:null})
    console.log(this.state.searchResult)
  }
  //render func to render the html element on screen
  render() { 
    return (
      <div className="App">
        <h1>User Management</h1>
        <div className="searchUser">
          <input type="text" placeholder="enter name of user to search" value={this.state.inUser} onChange={this.searchUserIn} onKeyUp={this.searchUser} />
        </div>

        <div className="user-search-box">
          {this.state.searchUser && (Object.keys(this.state.searchUser).map((k) => {
                let data = this.state.searchUser[k];
                return (
                  <div className="user-container">
                      <div className="user-image">
                        <img src={data.picture}/>
                      </div>
                      <div className="user-details">
                      <div className="user-name">
                      {data.fName} {data.lName}
                      </div>                  
                      <div className="user-address">  
                      {data.streetNum}, {data.streetName}, {data.city}, {data.State}                  
                      </div>
                      </div>
                      <button className="button-delete" type="button" onClick={this.deleteUser}>Delete</button>
                      </div>
            )}))
          }</div>
        <div className="User-Update">
          <p>{
            Object.keys(this.state.Users).map((k) => {
            let data = this.state.Users[k];
            return (
              <div className="user-container">
                  <div className="user-image">
                    <img src={data.picture}/>
                  </div>
                  <div className="user-details">
                  <div className="user-name">
                  {data.fName} {data.lName}
                  </div>                  
                  <div className="user-address">  
                  {data.streetNum}, {data.streetName}, {data.city}, {data.State}                  
                  </div>
                  </div>
                  <button className="button-delete" type="button" onClick={this.deleteUser}>Delete</button>
                  </div>
            );
           }
           )
           }
           
           <br /><br />
          </p>
        </div>

        <div className="addUser">

          <button className="buttons" type="button" onClick={this.addUser}>+ Add New User</button>

        </div>

      </div>
    );
  }
}

export default App;

import React from 'react';
// import '.src/App.css';

const User=(props)=>{
    if(props.inputUser){
        Object.keys(props.inputUser).map((k) => {
         let data = props.inputUser[k];
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
     )})
   }
}

export default User;
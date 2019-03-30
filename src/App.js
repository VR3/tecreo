import React, { Component } from 'react';
import {Divider} from 'antd';

import './App.css';
import {LandingMessage, BasicForm, Header, Help, Perfil} from './components'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyCkGUOF-fb_SQyCdkkGPIw5vaw3SXj1wDM",
  authDomain: "tecreo-b48c9.firebaseapp.com",
  databaseURL: "https://tecreo-b48c9.firebaseio.com",
  projectId: "tecreo-b48c9",
  storageBucket: "tecreo-b48c9.appspot.com",
  messagingSenderId: "862234379109"
};
firebase.initializeApp(config);
var db = firebase.firestore();

firebase
  .auth()
  .signInAnonymously()
  .catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode, errorMessage);
});

firebase
  .auth()
  .onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
})

class App extends Component {

  state = {
    centers: null,
    route: 'perfil',
  }

  setCenters = (centers) => {
    console.log(centers);
    this.setState({centers})
  }

  setRoute = (route) => {
    console.log(route);
    this.setState({route})
  }

  render() {
    const {centers, route} = this.state; 
    return (
      <div className='App'>
        {centers ? (
          <React.Fragment>
            <Header setRoute={this.setRoute} centers={centers} />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2%'}}>
            {route === 'help' && (
              <Help centers={centers}/>
            )}
            {route === 'perfil' && (
              <Perfil firebase={firebase} db={db} />
            )}
          </div>
          </React.Fragment>  
        ) : (
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '5%'}}>
            <LandingMessage />
            <BasicForm firebase={firebase} db={db} setCenters={this.setCenters}/>
          </div>
        )}
        
        
        
      </div>
    );
  }
}

export default App;
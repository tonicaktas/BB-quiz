import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuB3KARpmLmkRfU5OdOk5wkE9eZCtZAEw",
    authDomain: "bb-quiz.firebaseapp.com",
    databaseURL: "https://bb-quiz.firebaseio.com",
    projectId: "bb-quiz",
    storageBucket: "bb-quiz.appspot.com",
    messagingSenderId: "554738722818"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1:'',
        q2:'',
        q3:'',
        q4:''
      },
      submitted:false
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }


handleNameSubmit(event){
  var name = this.refs.name.value; //hämtar värdet from formulären
  this.setState({name:name},function(){
    console.log(this.state);
  }); // sparar värdet i state nyckel name

  event.preventDefault();
}

handleQuestionSubmit(event){
  console.log('ja då');
  firebase.database().ref('quiz/'+this.state.id).set({
    name: this.state.name,
    answers: this.state.answers
  });

  this.setState({submitted:true},function(){
    console.log('firebase');
  });
    event.preventDefault();
}

handleQuestionChange(event){
  var answers = this.state.answers;

  if(event.target.name === 'q1'){
    answers.q1 = event.target.value;  // sätter ny värde i variablen som är hämtad från input
  } else if(event.target.name === 'q2') {
    answers.q2 = event.target.value;
  } else if(event.target.name === 'q3') {
    answers.q3 = event.target.value;
  } else if(event.target.name === 'q4') {
    answers.q4 = event.target.value;
  }
  this.setState({answers:answers},function(){ // skickar ny variablen answers till state och udaterar state
    console.log(this.state);
  });
}

  render() {
    var user;
    var questions;
   // om det name-input är ifyllt  och om formulären är ej skickad
    if(this.state.name && this.state.submitted === false) {
      user = <h2> Välkommen {this.state.name}</h2>

      questions = <span>
        <h3>Frågor</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is ett?</label><br/>
            <input type="radio" name="q1" value="ett" onChange={this.handleQuestionChange} /> ett <br/>
            <input type="radio" name="q1" value="tva" onChange={this.handleQuestionChange} /> två <br/>
            <input type="radio" name="q1" value="tre" onChange={this.handleQuestionChange} /> tre <br/>
            <input type="radio" name="q1" value="fyra" onChange={this.handleQuestionChange} /> fyra <br/>
            <input type="radio" name="q1" value="fem" onChange={this.handleQuestionChange} /> fem <br/>

          </div>
          <div>
            <label>What is två?</label><br/>
            <input type="radio" name="q2" value="ett" onChange={this.handleQuestionChange} /> ett <br/>
            <input type="radio" name="q2" value="tva" onChange={this.handleQuestionChange} /> två <br/>
            <input type="radio" name="q2" value="tre" onChange={this.handleQuestionChange} /> tre <br/>
            <input type="radio" name="q2" value="fyra" onChange={this.handleQuestionChange} /> fyra <br/>
            <input type="radio" name="q2" value="fem" onChange={this.handleQuestionChange} /> fem <br/>

          </div>
          <div>
            <label>What is tre?</label><br/>
            <input type="radio" name="q3" value="ett" onChange={this.handleQuestionChange} /> ett <br/>
            <input type="radio" name="q3" value="tva" onChange={this.handleQuestionChange} /> två <br/>
            <input type="radio" name="q3" value="tre" onChange={this.handleQuestionChange} /> tre <br/>
            <input type="radio" name="q3" value="fyra" onChange={this.handleQuestionChange} /> fyra <br/>
            <input type="radio" name="q3" value="fem" onChange={this.handleQuestionChange} /> fem <br/>

          </div>
          <div>
            <label>What is fyra?</label><br/>
            <input type="radio" name="q4" value="ett" onChange={this.handleQuestionChange} /> ett <br/>
            <input type="radio" name="q4" value="tva" onChange={this.handleQuestionChange} /> två <br/>
            <input type="radio" name="q4" value="tre" onChange={this.handleQuestionChange} /> tre <br/>
            <input type="radio" name="q4" value="fyra" onChange={this.handleQuestionChange} /> fyra <br/>
            <input type="radio" name="q4" value="fem" onChange={this.handleQuestionChange} /> fem <br/>

          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>



    }
    // om det finns inget ifyllt i name-input och om formulären är ej skickad
    else if(!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter ur name</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter Name..." ref="name" />
        </form>

      </span>;
      questions = '';
    }
    // om formulären är skickad
    else if (this.state.submitted === true){

      user = <h2>Bra jobbat {this.state.name}, tack....</h2>
    }
    return (
      <div className="App ">
        <header className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Admin panel Borås Basket</h1>
        </header>
        <div className="text-center">
        {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>

    );
  }
}

export default App;

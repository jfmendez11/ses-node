import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmailSender from './EmailSender';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Email sent!
        </p>
      </header>
      <EmailSender />
    </div>
  );
}

export default App;

import React from 'react';

import NewUser from './Components/NewUser';
import SignIn from './Components/SignIn';
import Gallery from './Components/Gallery';

import './App.css';

function App() {
  return (
    <div className="App">
      <NewUser/>
      <SignIn />
      <Gallery />
    </div>
  );
}

export default App;

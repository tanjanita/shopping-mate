import React from 'react';

import Items from './components/Items';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>shoppingMate <img src="logo192.png" alt="groceries icon" width="80" height="80" /></h1>
        <p className="subtitle">Yey, you're out shopping with your mate :)</p>
        <p>Let's split up that shopping list !</p>
      </header>

      <Items />
      
      <div className="App-footer">
        Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </div>
  );
}

export default App;
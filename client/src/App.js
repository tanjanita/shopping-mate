import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Items from './components/Items';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Header />

      <Items />
      
      <Footer />
    </div>
  );
}

export default App;
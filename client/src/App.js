import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './styles/styles.css';

function App() {
  
  return (
    <React.StrictMode>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </React.StrictMode>
  );
}

export default App;
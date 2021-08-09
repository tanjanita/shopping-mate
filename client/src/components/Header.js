import React from 'react';

export default function Header() {
  
  return (
    <header className="header">
      <h1 className="header__headline">
        shoppingMate 
        <img className="header__logo" src="logo192.png" alt="groceries icon" width="40px" height="40px" />
      </h1>
      <p className="header__subtitle">Yey, you're out shopping with your mate :&#41;</p>
    </header>
  );
}
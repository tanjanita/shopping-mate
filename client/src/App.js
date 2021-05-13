import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>shoppingMate <img src="logo192.png" alt="groceries icon" width="96" height="96" /> </h1>
        <p>Yey, you're out shopping with your mate. Let's split up that shopping list!</p>
      </header>

      <main className="App-main">
        <div>Add item</div>
        <div>Shopping list</div>
        <div>Delete item</div>
      </main>
      
      <div className="App-footer">
        Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </div>
  );
}

export default App;
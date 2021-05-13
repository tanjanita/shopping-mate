import ItemAddition from './components/ItemAddition';
import ItemListing from './components/ItemListing';
import ItemDeletion from './components/ItemDeletion';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>shoppingMate <img src="logo192.png" alt="groceries icon" width="96" height="96" /> </h1>
        <p>Yey, you're out shopping with your mate. Let's split up that shopping list!</p>
      </header>

      <main className="App-main">
        <ItemAddition />
        <ItemListing />
        <ItemDeletion />
      </main>
      
      <div className="App-footer">
        Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </div>
  );
}

export default App;
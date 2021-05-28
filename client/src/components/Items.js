import React, { useState, useEffect } from 'react';

import ItemAddition from './ItemAddition';
import ItemListing from './ItemListing';
import ItemDeletion from './ItemDeletion';

function Items() {

  const [itemList, setItemList] = useState([]);

  useEffect(() => fetchListItemsGET(), []);

  function fetchListItemsGET() {
    return fetch('http://localhost:3333/shoppingItems')
      .then(response => response.json())
      .then(jsondata => setItemList(jsondata))
  };

  function handleItemAddition(event) {

    event.preventDefault();

    // POST new item to DB, then fetch new item-list from DB and feed into itemList state variable
    fetch('http://localhost:3333/shoppingItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': event.target.name.value})
    })
      .then(() => {
        fetchListItemsGET();
      });
  };

  function handleItemCheck(event) {

    const updateObject = {
      '_id': event.target.id, 
      'field': 'status', 
      'value': (event.target.checked) ? "Done" : "Pending"
    };

    return fetch('http://localhost:3333/shoppingItem', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateObject)
    })
      .then(() => {
        fetchListItemsGET();
      });
  }

  function handleClickDeleteDone() {
    
    const deletionFilter = {
      'field': 'status', 
      'value': "Done"
    };

    return fetch('http://localhost:3333/shoppingItems', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deletionFilter)
    })
      .then(() => {
        fetchListItemsGET();
      });
  }

  return (
    <main className="App-main">
    <React.StrictMode>

      <ItemAddition onFormSubmit={handleItemAddition} />
      <ItemListing itemList={itemList} onItemCheck={handleItemCheck} />
      <ItemDeletion onClickDeleteDone={handleClickDeleteDone} />

    </React.StrictMode>
    </main>
  );

}

export default Items;
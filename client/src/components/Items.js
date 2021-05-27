import React, { useState, useEffect } from 'react';

import ItemAddition from './ItemAddition';
import ItemListing from './ItemListing';
import ItemDeletion from './ItemDeletion';

function Items() {

  const [itemList, setItemList] = useState([]);
  // trigger state for useEffect
  const [listUpdate, triggerListUpdate] = useState(0);

  useEffect(() => {
    console.log('useEffect', listUpdate);
    // fetch directly inside
      fetch('http://localhost:3333/shoppingItems')
       .then(data => data.json())
        .then(jsondata => {
          setItemList(jsondata);
        });
  }, [listUpdate]);


  function handleItemAddition(event) {

    event.preventDefault();

    fetch('http://localhost:3333/shoppingItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': event.target.name.value})
    })
    .then(triggerListUpdate(listUpdate+1)); // change state, to trigger list update/useEffect
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
    .then(triggerListUpdate(listUpdate+1)); // change state, to trigger list update/useEffect
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
    .then(triggerListUpdate(listUpdate+1)); // change state, to trigger list update/useEffect
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
// import React, { useState, useEffect } from 'react';
import React, { useEffect, useState } from 'react';

import ItemAddition from './ItemAddition';
import ItemListing from './ItemListing';
import ItemDeletion from './ItemDeletion';


function Items() {

  const [itemList, setItemList] = useState([]);

  function updateItems() {
    // fetching data with fetch default action "get". response data is turned into json.
    return fetch('http://localhost:3333/shoppingItems')
      .then(data => data.json())
      .then(items => {setItemList(items)})
      // .then(console.log("itemList", itemList))
      ;
  } 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {updateItems()}, []);
  // updateItems();

  function handleItemAddition(event) {

    event.preventDefault();
    let inputDetails = JSON.stringify({'name': event.target.name.value});

    return fetch('http://localhost:3333/shoppingItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: inputDetails
    })
    .then(data => console.log("Data additon ok?", data.ok))
    .then(updateItems());
  };
  
  return (
    <main className="App-main">
      <ItemAddition onFormSubmit={handleItemAddition} />
      <ItemListing itemList={itemList} />
      <ItemDeletion />
    </main>
  );
}

export default Items;
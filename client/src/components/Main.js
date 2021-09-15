import React, { useState, useEffect } from 'react';
import ItemAddition from './ItemAddition';
import ItemListing from './ItemListing';
import ItemDeletion from './ItemDeletion';

function Items() {

  const [itemInput, setItemInput] = useState('');
  const [itemInputError, setItemInputError] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetchListItemsGET();
    fetchCategoryOptionsGET();
  }, []);

  function fetchListItemsGET() {
    return fetch('http://localhost:3333/api/lists/ba65b81b-bf1b-4981-af45-ebd082bd9905')
      .then(response => response.json())
      .then(jsondata => setItemList(jsondata.list.items))
  }

  function fetchCategoryOptionsGET() {
    return fetch('http://localhost:3333/api/categories')
      .then(response => response.json())
      .then(jsondata => { setCategoryOptions(jsondata['categories list']) })
  }

  function handleItemInputChange(event) {
    setItemInput(event.target.value);
    setItemInputError('');
  }

  function handleCategoryChange(event) {
    setCategorySelected(event.target.value);
  }

  function handleItemAddition(event) {
    event.preventDefault();

    // Item name must be given
    if (event.target.name.value === '') {
      setItemInputError('Please enter an item name:');
    } else {

      let newItem = { 'name': event.target.name.value };
      if ( event.target.category.value !== '') {
        newItem = {...newItem, 'category': event.target.category.value };
      }
      
      // POST new item to DB, fetch new item-list from DB
      fetch('http://localhost:3333/api/lists/ba65b81b-bf1b-4981-af45-ebd082bd9905/items', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( newItem )
      })
      .then(() => {
        // Update list of items
        fetchListItemsGET();
        // Delete values from form fields
        setItemInput('');
        setCategorySelected('');
      });

    }
  }

  function handleItemCheck(event) {

    const updateObject = {
      'status': (event.target.checked) ? 'Done' : 'Pending'
    };

    return fetch('http://localhost:3333/api/lists/ba65b81b-bf1b-4981-af45-ebd082bd9905/items/' + event.target.id, {
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

  function handleClickDeleteTicked() {

    return fetch('http://localhost:3333/api/lists/ba65b81b-bf1b-4981-af45-ebd082bd9905/items', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        fetchListItemsGET();
      });
  }

  return (
    <main className='main'>

      {/* <p className='listheader'>Let's split up that shopping list</p> */}

        <ItemAddition 
          onFormSubmit={handleItemAddition} 
          itemInput={itemInput} 
          itemInputError={itemInputError}
          onItemInputChange={handleItemInputChange} 
          categoryOptions={categoryOptions} 
          categorySelected={categorySelected} 
          onCategoryChange={handleCategoryChange} />

        <ItemListing itemList={itemList} onItemCheck={handleItemCheck} />
        
        <ItemDeletion onClickDeleteTicked={handleClickDeleteTicked} />

    </main>
  );
}

export default Items;
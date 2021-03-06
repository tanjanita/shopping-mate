import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import ItemAddition from './ItemAddition';
import ItemListing from './ItemListing';
import ItemDeletion from './ItemDeletion';

function List(props) {
  
  // Add new item text input
  const [itemInput, setItemInput] = useState('');
  const [itemInputError, setItemInputError] = useState('');
  // Aisle category dropdown
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  // The shopping list
  const [listFetched, setListFetched] = useState(false);
  const [listFetchError, setListFetchError] = useState(false);
  const [listName, setListName] = useState([]);
  const [itemList, setItemList] = useState([]);
  // Infobox at bottom
  const [infoboxVisibility, setInfoboxVisibility] = useState(true);
  
  const { uuid } = useParams();
  
  // Monitor location to update list in case it changes
  const location = window.location.href;

  useEffect(() => {
    fetchListItemsGET();
    fetchCategoryOptionsGET();
    
    // set newListURI state to '';
    if (props.newListURI.length > 7) {
      props.onNewListRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function fetchListItemsGET() {

    return fetch(process.env.REACT_APP_APIPATH + '/api/lists/' + uuid)
      .then(response => response.json())
      .then(jsondata => {
                // IF LIST FETCH RETURNS AN ERROR
        if (!jsondata.success) {
          setListFetchError(true);
        } else {
          setListName(jsondata.list.name);
          setItemList(jsondata.list.items);
          setListFetched(true);
        }
      })
  }

  // Redirect to "List not found" if there is an error fetching the list
  if (listFetchError) {
    return <Redirect to={{ pathname: "/listNotFound", state: { errorURL: location } }} />;
  }

  function fetchCategoryOptionsGET() {
    return fetch(process.env.REACT_APP_APIPATH + '/api/categories')
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
      fetch(process.env.REACT_APP_APIPATH + '/api/lists/' + uuid + '/items', {
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

    return fetch(process.env.REACT_APP_APIPATH + '/api/lists/' + uuid + '/items/' + event.target.id, {
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

    return fetch(process.env.REACT_APP_APIPATH + '/api/lists/' + uuid + '/items', {
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

  function toggleInfobox() {
    setInfoboxVisibility(!infoboxVisibility);
  }

  return (
    <div>
      <h2 className='main__title'>{listName}</h2>
      
      <ItemAddition 
        onFormSubmit={handleItemAddition} 
        itemInput={itemInput} 
        itemInputError={itemInputError}
        onItemInputChange={handleItemInputChange} 
        categoryOptions={categoryOptions} 
        categorySelected={categorySelected} 
        onCategoryChange={handleCategoryChange} />

      <ItemListing listFetched={listFetched} itemList={itemList} onItemCheck={handleItemCheck} />
      
      <ItemDeletion onClickDeleteTicked={handleClickDeleteTicked} />

      {/* classes for the bookmark infobox are specified in _main.scss */}
      <div className='infobox'>
      <div className='infobox__toggle flex-row-space-between' onClick={toggleInfobox}>
        <p className='infobox__headline'>??? Bookmark this list ???</p>
        <p className='infobox__button'>
        {infoboxVisibility ? '???' : '???'}
        </p>
      </div>
        {infoboxVisibility &&
          <div className="infobox__content" id='infobox-toggle'>
            <p className='infobox__text'>In order to <b>access this shopping list again later</b>, you will <b>need the link</b> to this page.</p>   
            <p className='infobox__text'>You can use it when you're out shopping or to share the list with your shopping-mate :&#41;</p>
            <p className='infobox__text'>Please <b>bookmark or share the link address (right-click/long-press)</b> for this page:</p>
            <p className='infobox__text'><a href={location} className='infobox__link'>{location}</a></p>
            <p className='infobox__text'>Please note: Unused lists may be deleted after 90 days.</p>
          </div>
        }
      </div>

    </div>
  );
}

export default List;
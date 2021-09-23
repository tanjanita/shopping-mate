import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ListCreation from './ListCreation';
import List from './List';

function Main() {

  const [listInput, setListInput] = useState('');
  const [listInputError, setListInputError] = useState('');
  const [newListURI, setNewListURI] = useState('');
  
  // console.log('MAIN newListURI', newListURI);

  function handleListInputChange(event) {
    setListInput(event.target.value);
    setListInputError('');
  }

  function handleListCreation(event) {
    event.preventDefault();

    // List name must be given
    if (event.target.name.value === '') {
      setListInputError('Please enter a list name:');
    } else {

      const newList = { 'name': event.target.name.value };
      
      // POST new list to DB, set up redirecting to new list
      fetch(process.env.APIPATH + '/api/lists/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( newList )
      })
      .then(response => response.json())
      .then(jsondata => {
        // Delete input from form field
        setListInput('');
        // Trigger a redirect to the address of the new list given in the server response!
        setNewListURI(jsondata['list uri']);
      });
    }
  }

  function handleNewListRedirected() {
    setNewListURI(' ');
  }

  return (
    <main className='main'>
      <BrowserRouter>
        <Switch>

          <Route path="/lists/:uuid">
            <List 
            onNewListRedirect={handleNewListRedirected}
            newListURI={newListURI} />
          </Route>

          <Route path="/">
            <ListCreation 
              onFormSubmit={handleListCreation}
              listInput={listInput} 
              listInputError={listInputError} 
              onListInputChange={handleListInputChange}
              newListURI={newListURI} />
          </Route>

        </Switch>
        </BrowserRouter>
    </main>
  );
}

export default Main;
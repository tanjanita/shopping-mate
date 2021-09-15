import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import ListCreation from './ListCreation';
import List from './List';

function Main() {

  function handleListCreation(event) {
    event.preventDefault();
  }

  return (
    <main className='main'>
      <BrowserRouter>
        <Switch>

          <Route path="/lists/:uuid">
            <List />
          </Route>

          <Route path="/">
            <ListCreation onFormSubmit={handleListCreation} />
          </Route>

        </Switch>

        <br />
        <small><Link to="/">Create new list</Link> / <Link to="/lists/ba65b81b-bf1b-4981-af45-ebd082bd9905">Open existing list</Link></small>
        <br />
        
        </BrowserRouter>
    </main>
  );
}

export default Main;
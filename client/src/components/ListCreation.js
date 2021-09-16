import React from 'react';
import { Redirect } from 'react-router-dom';

function ListCreation(props) {

  if (props.newListURI.length > 7) {
    // console.log('LISTCREATION Redirecting to LIST');
    return <Redirect to={props.newListURI} />
  }

  return (
    <form onSubmit={props.onFormSubmit}>
      <h2>Start a new shopping list</h2>
      <p className="addItem__message">{props.listInputError}</p>
      <label className="addItem__label screen-reader-only" htmlFor="createList">List name</label>
      <input 
        id="createList"
        className="addItem__input" 
        type="text" 
        name="name" 
        placeholder="--- Enter a shopping list name --- "  
        value={props.listInput}
        onChange={props.onListInputChange} />
        {/* <p>Please note that in order to access your new shopping list again after closing the browser window, you need to bookmark the address in the next browser page.</p>        
        <br />
        <p>In order to reopen or share the list, you will need to use the full web address.</p> */}

      <button className="button" type="submit">Create my list!</button>
      <br />
    </form>
  );
}

export default ListCreation;
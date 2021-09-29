import React from 'react';
import { Redirect } from 'react-router-dom';

function ListCreation(props) {

  if (props.newListURI.length > 7) {
    // console.log('LISTCREATION Redirecting to LIST');
    return <Redirect to={props.newListURI} />
  }

  return (
    <form onSubmit={props.onFormSubmit}>
      <h2 className="main__title">Start a new shopping list</h2>
      <p className="addItem__message">{props.listInputError}</p>
      <label className="addItem__label screen-reader-only" htmlFor="createList">List name</label>
      <input 
        id="createList"
        className="addItem__input" 
        type="text" 
        name="name" 
        placeholder="--- Enter a shopping list name --- "  
        value={props.listInput}
        onChange={props.onListInputChange} 
        autoComplete="off"
        />
      <button className="button button__createList" type="submit">OK, create my list!</button>
      <br />
    </form>
  );
}

export default ListCreation;
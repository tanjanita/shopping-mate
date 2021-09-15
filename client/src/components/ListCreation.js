import React from 'react';

function ListCreation(props) {
  return (
    <form onSubmit={props.onFormSubmit}>
      <br />
      <h2>Start a new shopping list</h2>
      <p className="addItem__message">{props.itemInputError}</p>
      <label className="addItem__label screen-reader-only" htmlFor="addItem">List name</label>
      <input 
        id="createList"
        className="addItem__input" 
        type="text" 
        name="name" 
        placeholder="--- Enter a shopping list name --- "  
        value={props.itemInput}
        onChange={props.onItemInputChange} />
        {/* <p>Please note that in order to access your new shopping list again after closing the browser window, you need to bookmark the address in the next browser page.</p>        
        <br />
        <p>In order to reopen or share the list, you will need to use the full web address.</p> */}
        <br />
      <div className="flex-row-space-between">
        <button className="button" type="submit">Create my list!</button>
      </div>
      <br />
    </form>
  );
}

export default ListCreation;
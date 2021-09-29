import React from 'react';
import ItemCategory from './ItemCategory';

function ItemAddition(props) {
  return (
    <div className="addItem__container">
      <form onSubmit={props.onFormSubmit}>
      <h2 className="screen-reader-only">Add items</h2>
        <p className="addItem__message">{props.itemInputError}</p>
        <label className="addItem__label screen-reader-only" htmlFor="addItem">Add item: </label>
        <input 
          id="addItem"
          className="addItem__input" 
          type="text" 
          name="name" 
          placeholder="--- Add a new item --- "  
          value={props.itemInput}
          onChange={props.onItemInputChange} />
        <div className="flex-row-space-between">
          <ItemCategory
            categoryOptions={props.categoryOptions} 
            categorySelected={props.categorySelected} 
            onCategoryChange={props.onCategoryChange} />
          <button className="button" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default ItemAddition;
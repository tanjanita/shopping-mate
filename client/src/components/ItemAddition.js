import React from 'react';
import ItemCategory from './ItemCategory';

function ItemAddition(props) {
  return (
    <form onSubmit={props.onFormSubmit}>

      <p>{props.itemInputError}</p>
      <input 
        className="addItem" 
        type="text" 
        name="name" 
        placeholder=" --- Add a new item --- "  
        value={props.itemInput}
        onChange={props.onItemInputChange} />

      <ItemCategory
        categoryOptions={props.categoryOptions} 
        categorySelected={props.categorySelected} 
        onCategoryChange={props.onCategoryChange} />

      <button type="submit">Add</button>
    </form>
  );
}

export default ItemAddition;
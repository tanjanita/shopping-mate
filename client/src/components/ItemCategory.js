import React from 'react';

function ItemCategory(props) {

  const categoryOptions = props.categoryOptions;

  return (
    <select 
      className="itemCategory__select"
      name="category" 
      id="category" 
      value={props.categorySelected}
      onChange={props.onCategoryChange}>
      
      <option value="">--- Select category --- </option>

      {categoryOptions.map((option) => 
        <option value={option._id} key={option._id}>{option.name}</option>
      )}

    </select>
  );
}

export default ItemCategory;
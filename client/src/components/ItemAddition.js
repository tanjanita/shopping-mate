import React, { useState } from 'react';
import ItemCategory from './ItemCategory';

function ItemAddition(props) {

  const [itemInput, setItemInput] = useState('');

  return (
    <div>
    <form onSubmit={props.onFormSubmit}>
      <input className="addItem" type="text" onChange={event => setItemInput(event.target.value)} name="name" value={itemInput} placeholder="Add a new item"/>

      <ItemCategory categoryOptions={props.categoryOptions} />

      <button type="submit">Add</button>
    </form>
    </div>
  );
}

export default ItemAddition;
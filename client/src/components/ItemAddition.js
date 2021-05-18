import React, { useState } from 'react';

function ItemAddition(props) {

  const [itemInput, setItemInput] = useState('');

  return (
    <div>
    <form onSubmit={props.onFormSubmit}>
      <input type="text" onChange={event => setItemInput(event.target.value)} name="name" value={itemInput}/> <button type="submit">Add item</button>
    </form>
    </div>
  );
}

export default ItemAddition;
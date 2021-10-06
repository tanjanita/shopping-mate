import React from 'react';

function ListNotFound() {

  return (

    <div className='itemList__empty'>
      <p className='itemList__empty-info'>Oops, we could not find a list matching the given link/list ID.</p>
      <p className='itemList__empty-info'>Please double-check the link address and try again or start a new list.</p>
    </div>
  );
}

export default ListNotFound;
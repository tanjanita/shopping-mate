import React from 'react';

function ItemDeletion(props) {
  return (
    <div>
      <button type="button" onClick={props.onClickDeleteDone}>Delete all items ticked / purchased</button>
    </div>
  );
}

export default ItemDeletion;
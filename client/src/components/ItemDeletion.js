import React from 'react';

function ItemDeletion(props) {
  return (
    <div className="itemDeletion">
      <h2 className="screen-reader-only">Delete items</h2>
      <button type="button" className="button itemDeletion__button" onClick={props.onClickDeleteTicked}>Delete all items you've ticked &nbsp;🛒</button>
    </div>
  );
}

export default ItemDeletion;
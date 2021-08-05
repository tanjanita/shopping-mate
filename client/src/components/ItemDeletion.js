import React from 'react';

function ItemDeletion(props) {
  return (
    <div>
      <button type="button" className="button--delete" onClick={props.onClickDeleteTicked}>Delete all items you've ticked &nbsp;🛒</button>
    </div>
  );
}

export default ItemDeletion;
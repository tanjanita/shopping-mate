import React from 'react';

function ItemDeletion(props) {
  return (
    <div>
      <button type="button" className="button--delete" onClick={props.onClickDeleteDone}>Delete all items you've ticked &nbsp;🛒</button>
    </div>
  );
}

export default ItemDeletion;
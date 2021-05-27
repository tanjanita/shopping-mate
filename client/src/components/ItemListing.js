import React from 'react';

function ItemListing(props) {

  const itemList = props.itemList;

  return (
    <div className="itemList">
      <ul>
        {itemList.map((item) => ( 
          <li key={item._id}>
            <input type="checkbox" id={item._id} name={item.name} onChange={(event) => {
    props.onItemCheck(event)}} defaultChecked={item.status === "Done" && "checked"} />
            <label htmlFor={item._id}> {item.name} </label>
          </li>
        ))
        }
      </ul>  
    </div>
  );
}

export default ItemListing;
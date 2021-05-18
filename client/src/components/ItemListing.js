import React from 'react';

function ItemListing(props) {

  const itemList = props.itemList;

  return (
    <div className="itemList">
      <ul>
        {itemList.map((item, index) => ( 
          <li key={index}>
            <input type="checkbox" id={item._id} name={item.name} /> <label htmlFor={item._id}>{item.name}</label>
          </li>
        ))
        }
      </ul>  
    </div>
  );
}

export default ItemListing;
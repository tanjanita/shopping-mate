import React, { useState, useEffect } from 'react';

function getShoppingItems() {
    // fetching data with fetch default action "get". response data is turned into json.
    return fetch('http://localhost:3333/shoppingItems')
      .then(data => data.json())
}

function ItemListing() {

  let [itemList, setItemList] = useState([]);

  function updateItems() {
    getShoppingItems()
      .then(items => {setItemList(items)})
  } 

  useEffect(() => {updateItems()}, []);

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
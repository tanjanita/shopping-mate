import React from 'react';

function ItemListing(props) {

  const itemList = props.itemList;
  // console.log("itemList: ", itemList);

  // Reduce itemList to have an array of: category (string) and items (array). Each item object contains: name, status & ID
  const categoryList = itemList.reduce( (accumulator, currentData) => {
    const { category: {name: categoryName='Miscellaneous'} = {}, name, status, _id } = currentData;
    const categoryIndex = accumulator.findIndex( (element) => element.category === categoryName );
    if (categoryIndex === -1) {
      accumulator.push({"category": categoryName, "items": [{"name": name, "status": status, "_id": _id}]});
    } else {
      accumulator[categoryIndex].items.push({"name": name, "status": status, "_id": _id});
    }
    return accumulator;
  }, []);
  // console.log("categoryList: ", categoryList);

  return (

    <div className="itemList">

      {categoryList.map((element) => 

          <div key={element.category}>

          <h3 className="category__headline">{element.category}</h3>
          <ul>

          {element.items.map((item) => 

                <li key={item._id}>
                  <input type="checkbox" id={item._id} name={item.name} onChange={(event) => {props.onItemCheck(event)}} defaultChecked={item.status === "Done" && "checked"} />
                  <label htmlFor={item._id}> {item.name} </label>
                </li>

          )}

          </ul>
          </div>

      )}

    </div>

  ); // end of main return;
}

export default ItemListing;
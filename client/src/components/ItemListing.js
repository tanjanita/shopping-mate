import React from 'react';

function ItemListing(props) {

  const itemList = props.itemList;

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

  return (
    <div className="itemList">

    <h2 className="screen-reader-only">Shopping list</h2>

      {categoryList.map((element) => 

        <div key={element.category}>
          <h3 className="category__headline">{element.category}</h3>
          <ul className="item__list">

          {element.items.map((item) => 

            <li className="item__element" key={item._id}>
              <input className="item__checkbox" type="checkbox" id={item._id} name={item.name} onChange={(event) => {props.onItemCheck(event)}} defaultChecked={item.status === "Done" && "checked"} />
              <label className="item__label" htmlFor={item._id}> {item.name} </label>
            </li>

          )}
          
          </ul>
        </div>

      )}

    </div>
  ); // end of main return;
}

export default ItemListing;
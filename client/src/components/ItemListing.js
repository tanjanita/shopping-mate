import React from 'react';

function ItemListing(props) {

  const itemList = props.itemList;

  const categoryList = itemList.reduce( (accumulator, currentData) => {
    const { category: {name: categoryName='Miscellaneous'} = {}, name, status, UUID } = currentData;
    const categoryIndex = accumulator.findIndex( (element) => element.category === categoryName );
    if (categoryIndex === -1) {
      accumulator.push({'category': categoryName, 'items': [{'name': name, 'status': status, 'UUID': UUID}]});
    } else {
      accumulator[categoryIndex].items.push({'name': name, 'status': status, 'UUID': UUID});
    }
    return accumulator;
  }, []);

  return (
    <div className='itemList'>

    <h2 className='screen-reader-only'>List of shopping items</h2>

      {categoryList.map((element) => 

        <div key={element.category}>
          <h3 className='category__headline'>{element.category}</h3>
          <ul className='item__list'>

          {element.items.map((item) => 

            <li className='item__element flex-row-space-between' key={item.UUID}>
              <input className='item__checkbox' type='checkbox' id={item.UUID} name={item.name} onChange={(event) => {props.onItemCheck(event)}} defaultChecked={item.status === 'Done' && 'checked'} />
              <label className='item__label' htmlFor={item.UUID}> {item.name} </label>
            </li>

          )}
          
          </ul>
        </div>

      )}

    </div>
  ); // end of main return;
}

export default ItemListing;
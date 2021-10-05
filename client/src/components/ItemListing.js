import React from 'react';

function ItemListing(props) {

  const listFetched = props.listFetched;
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

      {(itemList.length === 0 && !listFetched) && 
        <div className='itemList__empty'>
          <p className='itemList__empty-info'>One moment please,</p>
          <p className='itemList__empty-info'>we're loading your list...</p>
        </div>
      }

      {(itemList.length === 0 && listFetched) && 
        <div className='itemList__empty'>
          <p className='itemList__empty-info'>Wohoo, looks like I'm a sparkling clean and empty list!</p> 
          <p className='itemList__empty-info'>Use the form above to add new shopping items to appear here.</p>
        </div>
      }

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
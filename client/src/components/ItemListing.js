
function ItemListing() {
  return (
    <div className="itemList">

      <ul>
        <li>
          <input type="checkbox" id="_id1" name="_id1" value="Strawberries" /> <label for="_id1">Strawberries</label>
        </li>
        <li>
          <input type="checkbox" id="_id2" name="_id2" value="Cookies" /> <label for="_id2">Cookies</label>
        </li>
        <li>
          <input type="checkbox" id="_id3" name="_id3" value="Crisps" /> <label for="_id3">Crisps</label>
        </li>
      </ul>  

    </div>
  );
}

export default ItemListing;
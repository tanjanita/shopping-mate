# shoppingMate API Documentation


## Resources
- __Lists:__ Shopping lists
- __Items:__ The shopping items are stored as an array within lists.
- __Categories:__ Categories of shopping aisles to assign items to.


## HTTP Methods and URIs

### Lists CRUD
- __Create: HTTP POST /api/lists__
- __Read: HTTP GET /api/lists/{listId}__ 
  - (selected list must be identified by ID, overview of lists is not available)
- Update: _NA (Not available, list names are currently not editable)_
- __Delete: HTTP DELETE /api/lists/{listId}__

### Item CRUD
- __Create: HTTP POST /api/lists/{listId}/items__
- Read: _NA (Not available, items are read together with lists)_
- __Update: HTTP PATCH /api/lists/{listId}/items/{itemId}__
  - (only handling status updates, item names are not editable)
- __Delete: HTTP DELETE /api/lists/{listId}/items__ 
  - (all items with status "Done" in the list will be deleted)

### Category CRUD
- Create: _NA (Not available, list of categories is pre-defined)_
- __Read: HTTP GET /api/categories__
- Update: _NA (Not available, list of categories is pre-defined)_
- Delete: _NA (Not available, list of categories is pre-defined)_


## Response Examples
Responses are sent in JSON format

### Lists: Create a new list

#### Request
```
POST /api/lists
```
```json
{
    "name": "My shopping list"
}
```

#### Response
```
Status: 201 Created
```
```json
{
    "success": true,
    "message": "List 'My shopping list' was created.",
    "list uri": "/api/lists/{listId}"
}
```

#### Error response example (no name sent in request body)
```
Status: 422 Unprocessable Entity
```
```json
{
    "success": false,
    "error": "Please provide a list name."
}
```


### Items: Delete all items with status "Done" from a list

#### Request
```
DELETE /api/lists/{listId}/items
```
```json
(no body required)
```

#### Response
```
Status: 200 Ok
```
```json
{
    "success": true,
    "message": "All items with status 'Done' were deleted from this list.",
    "list uri": "/api/lists/{listId}"
}
```

#### Error response example (invalid list ID)
```
Status: 422 Unprocessable Entity
```
```json
{
    "success": false,
    "error": "List ID is not valid."
}
```


## Response Codes

Errors and Validation will return the following codes:

| Response Code | Response Type        | Notes                                           |
|---------------|----------------------|-------------------------------------------------|
| 200           | Ok                   | Yey, all went well                              |
| 201           | Created              | A new record was created                        |
| 400           | Bad Request          | Could not process request                       |
| 404           | Not Found            | The requested resource could not be found       |
| 422           | Unprocessable Entity | Error information will be show in API response  |
| 500           | Server side error    | Error information will be show in API response  |
# shoppingMate ![shopping bag icon](client/public/images/Logo80.png)

### <span style="color:BurlyWood"> _Yey, you're out shopping with your mate. Let's split up that shopping list!_  </span>

A clear and simple browser-based app which allows users to categorise shopping items into shopping aisles. Multiple users can simultaneously work on the same shopping list, where they can add, check and delete shopping items. 
Eventually, users will be able to select shopping aisles to take care of. This way, they can split up the list and be done faster :) 

<span style="color:SteelBlue;font-size:small"> _Icon by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>_ </span>

# Behind The Scenes

- The App is built using Create-React-App
- Data is stored in MongoDB Atlas and accessed using Mongoose
- Express is used as app server
- The CORS Node package is used to enable cross-origin resource sharing
- CSS was normalised using Elad Shechter's RESET and Necolas Normalize.css v8.0.1
- SCSS and BEM are used to set up CSS


# File Structure
- The App is separated into 'server' and 'client' folders, which are deployed into separate Heroku apps
- The following documentation can be found in the 'documents' folder:
  - An outline of the API: routes, requests, responses and response codes
  - Postman export of API calls

# Functionality Outline

- Fundamentials: Item management in one list, sorted by categories ✔️
- Enhancement 1: Multiple lists ✔️
- Online Setup ✔️ _current status_
- List Expiry 🔥 _lined up for development_
- Enhancement 2: Multiple/Separate Users
- Enhancement 3: List Splitting / Category Ownership
- Optional Enhancements

## Fundamentials: Item management in one list, sorted by categories

### Item Addition
- Users can enter an item name. 
  - If the item name is missing, an error message appears. 
- Users can choose to assign a shop aisle category. 
  - The item list will get sorted accordingly. 
  - This selection is optional. If no category is assigned, the items appear under "Miscellaneous". 
- Categories are pre-existent and not too granular to keep the selection manageable.

### Item List
- The items appear sorted alphabetically within categories. 
- When items are checked, they appear striked-through and with a more subdued colour.
- The checked status is recorded in the database. 

### Item Deletion
- The user can delete all checked items using a separate button on the bottom.

## Enhancement 1: Multiple lists 

### List Creation
- Users can create individual lists from the home screen
  - Add create new list button
    - A list ID is to be created using UUID and added to the URL
    - MongoDB: Items are stored in an array nested within list documents

## Online Setup
✔️ _current status_

### Online Setup
- Launch the app online
  - Set up online data storage: MongoDB Atlas DB
  - Set up online app server and client: Heroku apps
- Users can re-access lists by storing the page link including the list ID
- Display message while lists are loading
- Error handling when list could not be found or fetched: display message

## List Expiry
🔥 _lined up for development_

### List Refresh
- List items refresh automatically (periodically and/or triggered by list changes)

### List Expiry and Deletion 
- Delete lists after a set amount of time (e.g. 90 days since creation or last edit)
- Inform users about deletion time span and display expiry date
- Option to extend list deletion time span within X days of expiry

## Enhancement 2: Multiple/Separate Users

### User Addition
- Identifyable users
  - A user ID is added to the URL
  - The user ID is stored within the list
    - This happens when a new list is created (list owner ID), or when a user clicks "Help shopping / New user" (new user ID). The URL is then adapted to include the applicable user ID
- List owners can invite other shoppers 
  - "Share list" link is sent to new user (use share plugin)
    - This link only has the list ID and a marker "user invitation", including an unique key and an expiry time (3 days). Each invite has its own key and timer.
    - The list is initially shown without edit options, but a button to "Start/Help shopping"
    - Outdated keys are deleted periodically.
    - If a user tries to start shopping with an outdated key, they are told to ask for a new invite.

### Item addition
- Items can be added by any registered users. The user ID does not need to be stored with items.
  - User registration to be checked

### List Item Management
- Items can be checked by any registered user.
  - The user ID is stored with the item status.
  - The formatting needs to be different between items checked by the current user and those checked by another user. (Users can only delete items they have checked themselves.) 
  - Optional: If a user selects an item that someone else has checked, they are asked if they want to uncheck it. Unchecking is possible, after which the user has the option to check and delete that item. This way, no items are locked as checked due to user access separation.

### List Item Deletion
- Users can delete items they have checked
  - The deletion process has to include list and user IDs

## Enhancement 3: List Splitting / Category Ownership

### List Splitting
- Users can "adopt" categories to take care of them
  - Store user ID with categories OR store user IDs with categories
  - Selected categories and items are formatted differently for the "owner" (top, prominent) and other list users (bottom, greyed-out). Other users can still tick items.
- Users can release a category. 
- Category ownership should not get locked even if users do not release it
  - Assign timeout (30 minutes or automatically once a day)
  - OR enable other users to take over / release a category

## 🍬 Optional Enhancements

- Display user names > store user nicknames 
- "Abandon Shop" button. Reset all checked items and adopted categories.
- Button to delete a list
- Individual category management
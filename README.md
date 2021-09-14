# shoppingMate ![shopping bag icon](client/public/logo80.png)

## <span style="color:BurlyWood"> _Yey, you're out shopping with your mate. Let's split up that shopping list!_  </span>

A clear and simple app which allows users to categorise shopping items into shopping aisles. Users can work on their shopping list together to add, check and delete shopping items. Eventually, individual user will be able to adopt item aisle categories in the list. This way, they can visually split up the list and be done faster :)  

<span style="color:SteelBlue;font-size:small"> _Icon by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>_ </span>

# Behind the scenes

- The App is built using create-react-app
- Data is stored in MongoDB (Docker container) and managed with Mongoose
- Express is used as app server
- The CORS Node package is used to enable cross-origin resource sharing
- CSS was normalised using Elad Shechter's RESET and Necolas Normalize.css v8.0.1
- SCSS and BEM are used to set up CSS


# File structure
- The App is separated into 'server' and 'client' folders with further folder structure within those.
- The following documentation can be found in the 'documents' folder:
  - An outline of the API: routes, requests, responses and response codes
  - Postman export of API calls

# Functionality

## 1) Fundamentials: Item management in one list, sorted by categories
<span style="color:OliveDrab;font-size:small">***>>> current status <<<***</span>

### Item Addition
- Users can enter an item name. 
    - If the item name is missing, an error message will appear above the entry field. 
- Users can also choose to assign a shop aisle category. 
    - The item list will get sorted accordingly. 
    - This selection is optional. If no category is assigned, the items appear under "Miscellaneous". 
- Categories are pre-existent and not too granular to keep the selection manageable.

### Item List
- The items appear sorted by category and alphabetically. 
- When items are checked, they appear striked-through and with a more subdued colour. 

### Item Deletion
- The user can delete all items whick are checked using a separate button on the bottom.

## 2) Enhancement 1: Multiple lists 
<span style="color:BurlyWood;font-size:small">***>>> currently in development <<<***</span>

### List Creation
- Users can create new individual lists from the home screen
  - Add create new list button
    - A list ID is to be created using UUID and added to the URL
    - User needs to be informed how to access the list: bookmark/share URL with list ID
    - MongoDB: The items are included in an array within a list ID document

## 3) Enhancement 2: Online Setup and Management

### Online Setup
- Need to bring the app online
  - Set up online data storage: Docker container with MongoDB
  - Set up online app server and client  
- Need to handle historic lists and items: 
  - Delete lists after a set amount of time (90 days since creation)
  - Add timestamp(s) to list document
  - Inform users about deletion time span (and display it)
    - "To keep things fresh for you, we clear old lists from our data shelves after 90 days (since creation / last edit)"
- Consider security issues

## 4) Enhancement 3: Multiple/Separate Users

### User Addition
- Users need to be identifiable
  - A user ID is to be created using UUID and added to the URL
  - The user ID is also stored with the list
    - This happens when a new list is created (list owner ID), or when a user clicks "Help shopping / New user" (new user ID). The URL is then adapted to include the applicable user ID
- List owners can invite other shoppers 
  - "Share list" link is sent to new user (use share plugin)
    - This link only has the list ID and a marker "user invitation", including an unique key and an expiry time (3 days). Each invite has its own key and timer.
    - The list is initially shown without edit options, but a button to "Start/Help shopping"
    - Outdated keys are deleted by a daily automatic check.
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

## 5) Enhancement 4: List Splitting / Category Ownership

### List Splitting
- Users can "adopt" categories to take care of them
  - Store user ID with categories OR store user IDs with categories
  - Selected categories and items are formatted differently for the "owner" (top, prominent) and other list users (bottom, greyed-out). Other users can still tick items.
- Users can release a category. 
- Category ownership should not get locked even if users do not release it
  - Assign timeout (30 minutes or automatically once a day)
  - OR enable other users to take over / release a category

## 6) Optional Enhancements

- Display user names > store user nicknames
- "Abandon Shop" button. Reset all checked items and adopted categories. 
- Button to completely delete a list
- Individual category management
- Option to extend list deletion time span within X days of expiry
- Extend list deletion time span according to last edit date
# Reqres User Management Application

This is a React application that integrates with the Reqres API to perform basic user management functions including authentication, listing users, and CRUD operations.

## Deployed Application
Check out the live application: [Reqres User Management](https://reqres-user-management.netlify.app/login)


## Features
* **Authentication**: Users can log in with their credentials
* **User Listing**: Display a paginated list of users with their details
* **User Management**: Edit and delete user information
* **Search Functionality**: Filter users based on name or email
* **Responsive Design**: Works well on both desktop and mobile devices

## Technologies Used
* React.js
* React Router for navigation
* Axios for API requests
* CSS for styling (custom, no frameworks)
* LocalStorage for token persistence

## Installation
1. Clone the repository:
git clone https://github.com/Aaridhi/Reqres-user-management.git
cd Reqres-user-management
Copy
2. Install dependencies:
npm install
Copy
3. Start the development server:
npm start
Copy
4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Login
* Use the following credentials to log in:
* Email: eve.holt@reqres.in
* Password: cityslicka

### User Management
* **View Users**: After logging in, you'll be redirected to the users list
* **Search**: Use the search bar to filter users by name or email
* **Edit User**: Click the "Edit" button on a user card to modify their details
* **Delete User**: Click the "Delete" button to remove a user from the list
* **Pagination**: Navigate through pages using the previous and next buttons

## API Integration
This application integrates with the Reqres API (https://reqres.in/) for all operations:
* **Login**: POST https://reqres.in/api/login
* **Get Users**: GET https://reqres.in/api/users?page={page}
* **Update User**: PUT https://reqres.in/api/users/{id}
* **Delete User**: DELETE https://reqres.in/api/users/{id}

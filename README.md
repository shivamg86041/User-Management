# User Management App

This application allows users to sign up, log in, and manage user records. It includes features such as adding, viewing, editing, and deleting user records, along with filtering and searching functionalities.

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Application Flow](#application-flow)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Requirements

To run this application, you need to have the following software installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm is included with Node.js

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/user-management-app.git
   cd user-management-app

1. Install Dependencies:

npm install

2. Run the Application:

npm start
<!-- The application should now be running at http://localhost:3000. -->

3. Application Flow

Signup:

Visit http://localhost:3000/.
Fill in the required details (Name, Email, Phone, Gender, Sources, City).
Click the "Sign Up" button.

Login:

Visit http://localhost:3000/login.
Enter your email and password.
Click the "Login" button.

Dashboard:

After logging in, you will be redirected to the dashboard.
The dashboard displays a list of users with options to add, view, edit, and delete records.
You can filter and search for users based on different criteria.

Add User:

Click the "Add User" button on the dashboard.
Fill in the user details.
Click the "Save" button to add a new user.

View Details:

Click on a user card on the dashboard to view detailed information.

Edit User:

Click the edit icon on a user card.
Modify the user details.
Click the "Save" button to update the user record.

Delete User:

Click the delete icon on a user card.
Confirm the deletion in the dialog.
The user record will be removed from the list.

Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Styling: CSS (for simplicity)

# RBAC
VRV Security’s Backend Developer Intern Assignment
# Role-Based Access Control (RBAC) System

This is a Node.js and Express.js project that implements Role-Based Access Control (RBAC). It includes user authentication, role management, and secure API endpoints for managing user roles and permissions.

---

## Features

- **User Authentication**: 
  - Register and login functionality with hashed passwords.
- **Protected Routes**: 
  - Only authenticated users can access specific routes.
- **Role-Based Access Control**:
  - Users have roles like Admin, Moderator, or User.
  - Access is controlled based on roles.
- **Role Management**: 
  - Admin can update user roles.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- dotenv for environment variable management

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. Install dependencies:
   
    npm install
   
4. Create a .env file in the root directory and add the following variables:

    PORT=5000
    MONGO_URI=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret>
    
4.Start the server:
    npm start
   
API Endpoints
   Authentication
  1. Register
     POST /api/users/register
     
        Body:
        {
          "username": "testuser",
          "email": "test@example.com",
          "password": "password123",
          "role": "User"
        }
  2. Login
        POST /api/users/login
     
        Body:
       {
          "email": "test@example.com",
          "password": "password123"
       }

 Protected Routes
  1.Get Profile
    GET /api/users/profile
    Requires Bearer Token in the Authorization header.
    
  2.Admin Access
      GET /api/users/admin
      Accessible only by users with the "Admin" role.
      
  3. Dashboard Access
      GET /api/users/dashboard
      Accessible by "Admin" and "Moderator".

     
  Role Management
  1. Update User Role
      PUT /api/users/update-role/:id
      Body:
       {
          "role": "Admin"
       }
     Requires Bearer Token with "Admin" role.

Testing with Thunder Client

  1. Register a User:
      Send a POST request to /api/users/register.

  2. Login:
      Send a POST request to /api/users/login and retrieve the token.

  3. Access Protected Routes:
      Use the token in the Authorization header as Bearer <token> to access protected routes.

  4.  Update Role:
      Use the PUT /api/users/update-role/:id endpoint with the user ID and the new role.             Include the admin token in the Authorization header.

 Folder Structure
   

  ├── models
  │   ├── User.js        // User model schema
  │   └── Role.js        // Role model schema (if applicable)
  ├── middlewares
  │   └── authMiddleware.js // Authentication and role-based middleware
  ├── routes
  │   └── userRoutes.js  // User-related routes
  ├── .env               // Environment variables
  ├── server.js          // Entry point of the application
  └── package.json       // Project dependencies and scripts


License
This project is licensed under the MIT License. Feel free to use and modify it.

Author
Developed by Jephy. 😊


Save this as `README.md` in your project folder, and it will display nicely on GitHub! Let me know if you need any further adjustments. 😊



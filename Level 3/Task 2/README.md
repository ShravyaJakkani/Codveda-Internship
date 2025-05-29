# JWT Authentication API

A simple authentication API built with Node.js, Express, MongoDB, and JWT. It includes routes for user registration, login, and profile fetching using token-based authentication.

## Project Structure

Codeveda/
|__Level 3/
|  |_Task 2/
|  | |_auth/
|  | | |_src/
|  | | | |_components/
|  | | | | |_Login.jsx
|  | | | | |_Profile.jsx
|  | | | | |_Register.jsx
|  | | | |_App.css
|  | | | |_APP.jsx
|  | | | |_index.js
|  | | |_package.json
|  | |_middlewares/
|  | | |_authMiddleware.js
|  | | |_verifyToken.js
|  | |_models/
|  | | |_User.js
|  | |_routes/
|  | | |_authRoutes.js
|  | |_index.js
|  | |_package.json
|  | |_README.md


## Features

- User Registration
- Secure Login with JWT Token
- Protected Profile Route (Requires Valid Token)
- MongoDB Integration

## Installation

1. Install dependencies:
   
   npm install

2. Create a .env file:
   
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

3. Start the server:

   npx nodemon index.js
    
   npm start

##  Technologies Used

    Node.js

    Express.js

    MongoDB 

    JSON Web Token (JWT)

    bcryptjs

    dotenv

    cors

## Testing

 Use Postman or any REST client to test the API endpoints. Ensure you send the JWT token in the Authorization header when accessing the profile route.

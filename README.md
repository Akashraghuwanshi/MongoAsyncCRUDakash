# Author: Akash Raghuwanshi MERN Developer

# Project: MVC Authentication System

[<img src="public/Images/clickbutton.png" width="35px" height="35px"/>](https://glitch.com/edit/#!/authenticationrestapiakash?path=.glitch-assets%3A1%3A0)

**Deploy by clicking the above**

## Description
This project implements an MVC (Model-View-Controller) architecture in JavaScript to create an authentication system. It allows users to register, login, and obtain JWT (JSON Web Token) access tokens based on their roles.

## MongoDB
This project utilizes MongoDB, a NoSQL database, to store all data related to user authentication and authorization. MongoDB offers flexibility and scalability, making it suitable for handling user data in this authentication system.

# deploy at glitch.com
## Features
## Endpoints
- User Registration :/register(POST)
- User Login:http:/authorization(POST)
- User can access employeedata:/employee(GET)
- JWT Access Token Generation
- JWT Refresh Token Handling
- Role-based Access Control (Admin, Editor, User)
- Token Expiration Management

## Roles and Permissions
- Admin Role: Has full CRUD (Create, Read, Update, Delete) authority on all data.
- Editor Role: Can update existing data.
- User Role: Can access data but cannot modify it.

## Token Expiration
- JWT Refresh Token: Expires after one day, allowing direct login without re-entering credentials until logout.
- JWT Access Token: Expires every 10 minutes, generating a new token automatically for enhanced security.

## Security
- Passwords are encrypted with a secret key, ensuring they cannot be decrypted by unauthorized parties.



# Worko.ai Assignment

## Overview
This project provides a set of APIs for managing users as a part of Worko.ai assignment. It follows the MVC architecture with separate layers for controllers, services, and data access objects (DAO). The project uses MongoDB as the database and includes basic authentication for API endpoints.

## Features
- User CRUD operations
- Validation using Joi
- Basic JWT authentication 
- Unit tests with at least 60% coverage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm (v6 or higher)

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/meetkavad/Worko.ai
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Set up environment variables**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=8000
    MONGO_URI= <your_mongodb_url>
    JWT_SECRET= <jwt_secret_key>
    ```
    Use the following parameters for login: 
    ```env
    ADMIN=worko.ai
    PASSWORD= $2a$12$fcG/cYM7NjedpgeC4yJESO8979uNN6/KYEi91t9k0QzhJZM8ZRM2y (worko.ai)
    ```

4. **Start the application**
    ```sh
    npm start
    ```

### API Endpoints

- `GET /worko/api/` - List users
- `GET /worko/api/:userId` - Get user details
- `POST /worko/api/` - Create user
- `PATCH /worko/api/:userId` - Update user
- `DELETE /worko/api/:userId` - Delete user


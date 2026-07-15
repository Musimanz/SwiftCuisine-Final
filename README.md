# SwiftCuisine 🍳
> **Live Frontend Demo:** [Click here to view the live app on Vercel](https://swiftcuisine.vercel.app/)

An intelligent recipe generator built using the MERN stack.

---

### ⚠️ Important Deployment Note
The **live Vercel preview showcases the frontend client only**. 

To avoid the ongoing costs of hosting database clusters and server instances, the **live backend API is currently inactive**.

# API Documentation

## Configuring Project
- Copy `.env.example` and create a new file `.env`
- Copy a secret key from [Random Key Gen Website](https://randomkeygen.com/)
- Paste the secret key in `.env` in `JWT_SECRET` 
- Create an account on [MongoDB Website](https://www.mongodb.com) and create a DB Cluster 
- Copy your MongoDB URI
- Paste the URI in `.env` in `MONGO_URI` 
- Run `npm install` 
- Run `npm run start`
- Your server will be accessible on `http://localhost:5000`
---
## Blog Routes

### 1. Create a New Blog Post
- **Endpoint**: `POST /api/blogs/`
- **Authorization**: Protected (requires user authentication)
- **Request Body**:
  ```json
  {
    "title": "string",
    "body": "string",
    "thumbnail": "string"
  }
  ```
- **Response**:
  - **201 Created**: 
    ```json
    {
      "message": "Blog post created successfully",
      "blog": {
        "title": "string",
        "body": "string",
        "thumbnail": "string",
        "datePosted": "date"
      }
    }
    ```
  - **400 Bad Request** (if title already exists):
    ```json
    { "message": "A blog with this title already exists" }
    ```
  - **500 Internal Server Error**: 
    ```json
    { "message": "Error creating blog post", "error": "string" }
    ```

### 2. Get All Blog Posts
- **Endpoint**: `GET /api/blogs/`
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Blogs fetched successfully",
      "blogs": [
        {
          "title": "string",
          "body": "string",
          "thumbnail": "string",
          "datePosted": "date"
        }
      ]
    }
    ```

### 3. Get a Single Blog Post by ID
- **Endpoint**: `GET /api/blogs/:id`
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Blog fetched successfully",
      "blog": {
        "title": "string",
        "body": "string",
        "thumbnail": "string",
        "datePosted": "date"
      }
    }
    ```
  - **404 Not Found**: 
    ```json
    { "message": "Blog post not found" }
    ```

---

## Bookmarks Routes

### 1. Bookmark a Recipe
- **Endpoint**: `POST /api/bookmarks/recipe`
- **Authorization**: Protected (requires user authentication)
- **Request Body**:
  ```json
  {
    "recipeId": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    { "message": "Recipe bookmarked successfully" }
    ```
  - **400 Bad Request** (if recipe is already bookmarked):
    ```json
    { "message": "Recipe already bookmarked" }
    ```
  - **404 Not Found** (if user not found):
    ```json
    { "message": "User not found" }
    ```
  - **500 Internal Server Error**: 
    ```json
    { "message": "Error bookmarking recipe", "error": "string" }
    ```

### 2. Get All Bookmarked Recipes
- **Endpoint**: `GET /api/bookmarks/bookmarks`
- **Authorization**: Protected (requires user authentication)
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Bookmarked recipes fetched successfully",
      "bookmarks": [
        {
          "recipeId": "string",
          "name": "string",
          "ingredients": ["string"]
        }
      ]
    }
    ```

### 3. Remove a Bookmark
- **Endpoint**: `DELETE /api/bookmarks/recipe`
- **Authorization**: Protected (requires user authentication)
- **Request Body**:
  ```json
  {
    "recipeId": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    { "message": "Recipe removed from bookmarks" }
    ```
  - **404 Not Found** (if user or recipe not found):
    ```json
    { "message": "User not found" }
    ```

---

## Ingredients Routes

### 1. Add a New Ingredient
- **Endpoint**: `POST /api/ingredients/`
- **Request Body**:
  ```json
  {
    "name": "string",
    "category": "string"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    { "message": "Ingredient added", "ingredient": { "name": "string", "category": "string" } }
    ```
  - **400 Bad Request** (if ingredient already exists):
    ```json
    { "message": "Ingredient already exists" }
    ```
  - **500 Internal Server Error**: 
    ```json
    { "message": "Error adding ingredient", "error": "string" }
    ```

### 2. Get All Ingredients
- **Endpoint**: `GET /api/ingredients/`
- **Response**:
  - **200 OK**:
    ```json
    [
      { "name": "string", "category": "string" }
    ]
    ```

### 3. Delete an Ingredient
- **Endpoint**: `DELETE /api/ingredients/`
- **Request Body**:
  ```json
  {
    "name": "string",
    "category": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    { "message": "Ingredient deleted", "ingredient": { "name": "string", "category": "string" } }
    ```
  - **404 Not Found** (if ingredient not found):
    ```json
    { "message": "Ingredient not found" }
    ```
  - **500 Internal Server Error**:
    ```json
    { "message": "Error deleting ingredient", "error": "string" }
    ```

---

## Recipe Routes

### 1. Add a New Recipe
- **Endpoint**: `POST /api/recipes/`
- **Authorization**: Admin-only (or for testing purposes)
- **Request Body**:
  ```json
  {
    "name": "string",
    "ingredients": ["string"],
    "steps": ["string"],
    "category": "string"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    { "message": "Recipe added successfully", "recipe": { "name": "string", "ingredients": ["string"], "steps": ["string"], "category": "string" } }
    ```
  - **400 Bad Request** (if recipe already exists):
    ```json
    { "message": "Recipe with this name already exists" }
    ```
  - **500 Internal Server Error**:
    ```json
    { "message": "Error adding recipe", "error": "string" }
    ```

### 2. Get All Recipes
- **Endpoint**: `GET /api/recipes/`
- **Response**:
  - **200 OK**:
    ```json
    [
      { "name": "string", "ingredients": ["string"], "steps": ["string"], "category": "string" }
    ]
    ```

### 3. Search Recipes by Selected Ingredients
- **Endpoint**: `POST /api/recipes/search`
- **Request Body**:
  ```json
  {
    "selectedIngredients": ["string"]
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Recipe suggestions found",
      "suggestions": [
        {
          "name": "string",
          "ingredients": ["string"],
          "matchedIngredients": ["string"],
          "missingIngredients": ["string"]
        }
      ]
    }
    ```
  - **404 Not Found** (if no matching recipes found):
    ```json
    { "message": "No recipes found with the selected ingredients" }
    ```

### 4. Search Recipes by Name
- **Endpoint**: `GET /api/recipes/searchByName`
- **Request Query Parameters**:
  - `name`: The name of the recipe to search for.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Recipes found",
      "recipes": [
        { "name": "string", "ingredients": ["string"], "steps": ["string"], "category": "string" }
      ]
    }
    ```
  - **404 Not Found** (if no matching recipes found):
    ```json
    { "message": "No recipes found with the given name" }
    ```


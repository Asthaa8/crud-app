# CRUD App

A simple Node.js CRUD application using Express and MongoDB (Mongoose).

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update the MongoDB URI if needed.

3. Start the server:

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`.

## Endpoints

- `GET /api/products` - list all products
- `GET /api/products/:id` - get a product by ID
- `POST /api/products` - create a new product
- `PUT /api/products/:id` - update a product
- `DELETE /api/products/:id` - delete a product

## Example request body

```json
{
  "name": "Sample Product",
  "description": "A sample product description",
  "price": 25.5,
  "inStock": true
}
```

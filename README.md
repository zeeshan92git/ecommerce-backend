# E-Commerce Backend

A Node.js, Express, and MongoDB API for an e-commerce application, with product and category operations, user accounts, carts, orders, and inquiries.

## Stack

Express 5, Mongoose, JWT, bcrypt, Cloudinary, Multer, dotenv, and CORS. The project uses ES modules.

## Features

- User registration, login, profile retrieval, and image/profile updates.
- Product creation, listing, lookup, updates, and deletion.
- Category creation and listing.
- Per-user carts with add, quantity-update, remove, and clear operations.
- Order creation from a cart and order history.
- Authenticated inquiry submission.

## Setup

Install Node.js and npm, and make a MongoDB instance available.

```bash
npm install
```

Create a local `.env` file:

```dotenv
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URI=http://localhost:5173
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_APIKEY=your_api_key
CLOUDINARY_SECRETKEY=your_api_secret
```

Use your own values and do not commit secrets. The database helper appends `/Ecommerce` to `MONGODB_URI`; use a compatible base URI, or adapt the connection code for an Atlas URI with query parameters. Cloudinary credentials are required for profile image uploads.

```bash
npm start
```

This script runs `nodemon server.js`. Use `node server.js` to run without a file watcher. The default port is **5000**. Although `package.json` lists `index.js` as its main field, the actual start script uses `server.js`.

## API routes

| Prefix | Examples |
| --- | --- |
| `/api/user` | `POST /register`, `POST /login`, `GET /get-profile`, `POST /update-profile` |
| `/api/category` | `POST /add-category`, `GET /all-category` |
| `/api/product` | `POST /add-product`, `GET /all-product`, `GET /:prodId`, `POST /:prodId`, `DELETE /:prodId` |
| `/api/cart` | `POST /add`, `GET /get`, `POST /set-quantity`, `DELETE /remove/:productId`, `DELETE /clear` |
| `/api/order` | `POST /place`, `GET /get-order` |
| `/api/inquiry` | `POST /send` |

Protected routes use the custom `token` header. Profile images use the multipart field `image`. The root `GET /` returns a basic API message, not a full dependency health check.

## Structure

- `server.js`: middleware, route prefixes, and startup.
- `config/`: database and Cloudinary settings.
- `controllers/`: request handling.
- `routes/`: endpoint definitions.
- `models/`: products, categories, users, carts, orders, and inquiries.
- `middleware/`: JWT authentication and multipart uploads.

## Current limitations

Product and category mutation routes currently have no authentication middleware attached; add appropriate authorization before exposing them publicly. The admin controller is empty. Order creation exists, but no payment-gateway integration is implemented in these routes.

The `npm test` script is a placeholder. Setup instructions describe the committed source; a successful production deployment is not implied.

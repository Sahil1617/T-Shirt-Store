# T-Shirt Store Backend

A robust backend API for a t-shirt e-commerce platform built with Node.js and Express.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Admin Management**: Separate admin authentication and management routes
- **Product Management**: CRUD operations for t-shirt products
- **Shopping Cart**: Persistent cart functionality
- **Order Processing**: Complete order lifecycle management
- **Image Upload**: Cloudinary integration for product images
- **Data Validation**: Input validation with express-validator
- **Error Handling**: Centralized error handling middleware
- **CORS Support**: Cross-origin resource sharing configuration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_url
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_strong
   PORT=5000

   # Optional - for Cloudinary image storage
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

## Database Setup

1. Set up a MongoDB database (local or cloud like MongoDB Atlas)
2. Update the `MONGODB_URI` in your `.env` file with your database connection string

## Development

Start the development server:
```bash
node server.js
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Admin Authentication
- `POST /api/admin/auth/login` - Admin login

### Admin Management
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)
- `PUT /api/admin/orders/:id/status` - Update order status (admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

## Project Structure

```
backend/
├── config/
│   └── database.js      # Database connection
├── middleware/
│   ├── auth.js          # User authentication middleware
│   ├── adminAuth.js     # Admin authentication middleware
│   └── errorHandler.js  # Error handling middleware
├── models/
│   ├── User.js          # User model
│   ├── Product.js       # Product model
│   ├── Order.js         # Order model
│   └── Cart.js          # Cart model (if separate)
├── routes/
│   ├── auth.js          # User authentication routes
│   ├── adminAuth.js     # Admin authentication routes
│   ├── admin.js         # Admin management routes
│   ├── products.js      # Product CRUD routes
│   ├── cart.js          # Cart management routes
│   └── orders.js        # Order management routes
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── server.js            # Application entry point
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 5000)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name (optional)
- `CLOUDINARY_API_KEY`: Cloudinary API key (optional)
- `CLOUDINARY_API_SECRET`: Cloudinary API secret (optional)

## Contributing

1. Follow the existing code structure and naming conventions
2. Add proper error handling and validation
3. Update API documentation for new endpoints
4. Test thoroughly before committing

## License

This project is licensed under the ISC License.

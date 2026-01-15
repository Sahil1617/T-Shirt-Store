# 👕 T-Shirt Store

<div align="center">

![T-Shirt Store Banner](https://img.shields.io/badge/T--Shirt-Store-FF6B6B?style=for-the-badge&logo=shopify&logoColor=white)

A modern, full-stack e-commerce platform for t-shirts built with **React**, **Node.js**, **Express**, and **MongoDB**.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Demo](#demo) • [Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🛍️ Customer Features
- **User Authentication** - Secure registration and login with JWT tokens
- **Product Browsing** - Browse t-shirts with filtering by categories, sizes, and prices
- **Product Details** - Detailed product pages with size selection and add-to-cart
- **Shopping Cart** - Add, update, and remove items from cart
- **Checkout Process** - Seamless and secure order placement
- **Order History** - Track and view past orders
- **User Profile** - Manage account details and preferences

### 🔧 Admin Features
- **Admin Dashboard** - Comprehensive overview of store statistics
- **Product Management** - Full CRUD operations for products
- **Order Management** - View and update order statuses
- **User Management** - Monitor and manage registered users
- **Image Upload** - Cloudinary integration for product images

### 🎨 Design & UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Real-time Updates** - Live cart updates and toast notifications
- **3D Effects** - Interactive visuals with Three.js integration

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black) | UI Framework |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build Tool & Dev Server |
| ![Tailwind](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Styling Framework |
| ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Client-side Routing |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP Client |
| ![Three.js](https://img.shields.io/badge/-Three.js-000000?style=flat-square&logo=three.js&logoColor=white) | 3D Graphics |
| ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | Animations |

### Backend
| Technology | Purpose |
|------------|---------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Runtime Environment |
| ![Express](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white) | Web Framework |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Database |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) | ODM for MongoDB |
| ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | Authentication |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) | Image Storage |

---

## 📁 Project Structure

```
T-Shirt Store/
├── 📂 frontend/                    # React frontend application
│   ├── 📂 public/                  # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable UI components
│   │   │   ├── 📂 layout/          # Layout components (Navbar, Footer)
│   │   │   ├── 📂 products/        # Product-related components
│   │   │   └── 📂 ui/              # Generic UI components
│   │   ├── 📂 context/             # React context providers
│   │   ├── 📂 pages/               # Page components
│   │   │   ├── 📂 admin/           # Admin dashboard pages
│   │   │   └── 📂 auth/            # Authentication pages
│   │   ├── 📂 config/              # Configuration files
│   │   ├── App.jsx                 # Main application component
│   │   ├── main.jsx                # Application entry point
│   │   └── index.css               # Global styles
│   ├── .env                        # Environment variables
│   ├── package.json                # Dependencies and scripts
│   ├── vite.config.js              # Vite configuration
│   └── vercel.json                 # Vercel deployment config
│
├── 📂 backend/                     # Node.js backend application
│   ├── 📂 config/
│   │   └── database.js             # Database connection
│   ├── 📂 middleware/
│   │   ├── auth.js                 # User authentication middleware
│   │   ├── adminAuth.js            # Admin authentication middleware
│   │   └── errorHandler.js         # Error handling middleware
│   ├── 📂 models/
│   │   ├── User.js                 # User schema
│   │   ├── Product.js              # Product schema
│   │   └── Order.js                # Order schema
│   ├── 📂 routes/
│   │   ├── auth.js                 # User auth routes
│   │   ├── adminAuth.js            # Admin auth routes
│   │   ├── admin.js                # Admin management routes
│   │   ├── products.js             # Product CRUD routes
│   │   ├── cart.js                 # Cart management routes
│   │   ├── orders.js               # Order routes
│   │   └── userProfile.js          # User profile routes
│   ├── .env                        # Environment variables
│   ├── package.json                # Dependencies and scripts
│   ├── server.js                   # Application entry point
│   └── vercel.json                 # Vercel deployment config
│
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation
```

---

## 🚀 Installation

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Local installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/Sahil1617/T-Shirt-Store.git
cd T-Shirt-Store
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/tshirt-store

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_make_it_strong

# Server
PORT=5000

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`frontend/.env`)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=T-Shirt Store
```

---

## ▶️ Running the Application

### Start the Backend Server

```bash
cd backend
npm start
# or for development with auto-restart
node server.js
```

The API will be available at `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Frontend production build
cd frontend
npm run build

# Preview production build
npm run preview
```

---

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `GET` | `/api/auth/profile` | Get user profile | ✅ User |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/admin/auth/login` | Admin login | ❌ |
| `GET` | `/api/admin/users` | Get all users | ✅ Admin |
| `GET` | `/api/admin/orders` | Get all orders | ✅ Admin |
| `PUT` | `/api/admin/orders/:id/status` | Update order status | ✅ Admin |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/products` | Get all products | ❌ |
| `GET` | `/api/products/:id` | Get product by ID | ❌ |
| `POST` | `/api/products` | Create new product | ✅ Admin |
| `PUT` | `/api/products/:id` | Update product | ✅ Admin |
| `DELETE` | `/api/products/:id` | Delete product | ✅ Admin |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/cart` | Get user's cart | ✅ User |
| `POST` | `/api/cart` | Add item to cart | ✅ User |
| `PUT` | `/api/cart/:productId` | Update cart item quantity | ✅ User |
| `DELETE` | `/api/cart/:productId` | Remove item from cart | ✅ User |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/orders` | Get user's orders | ✅ User |
| `POST` | `/api/orders` | Create new order | ✅ User |
| `GET` | `/api/orders/:id` | Get order by ID | ✅ User |

---

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Browse all t-shirts with filtering
- **Product Detail** (`/product/:id`) - Individual product page
- **About** (`/about`) - About the store
- **Contact** (`/contact`) - Contact information
- **Journal** (`/journal`) - Blog/news section

### User Pages (Authentication Required)
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Order checkout process
- **Orders** (`/orders`) - Order history
- **Profile** (`/profile`) - User account management

### Admin Pages (Admin Authentication Required)
- **Admin Dashboard** (`/admin`) - Store overview and statistics
- **Product Management** - Add/edit/delete products
- **Order Management** - Process and update orders

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Guidelines

- Follow existing code style and structure
- Use meaningful variable and function names
- Add proper error handling and validation
- Write descriptive commit messages
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sahil** - [GitHub](https://github.com/Sahil1617)


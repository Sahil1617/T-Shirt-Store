# T-Shirt Store

A full-stack e-commerce application for selling custom t-shirts, featuring a modern React frontend and a robust Node.js/Express backend with MongoDB.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Product Management**: Browse, filter, and search t-shirts by categories, sizes, and prices
- **Shopping Cart**: Add/remove items, update quantities with real-time updates
- **Order Processing**: Complete checkout flow with order history
- **Admin Dashboard**: Comprehensive admin panel for managing products, orders, and users
- **Responsive Design**: Mobile-first design that works on all devices
- **Image Upload**: Cloudinary integration for product image management
- **Real-time Notifications**: Toast notifications for user feedback

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Three.js** - 3D graphics and effects
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload handling

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd t-shirt-store
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   ```
   - Copy `.env` file and configure your environment variables
   - Update MongoDB URI and JWT secret

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   - Copy `.env` file and set API base URL

## 🏃‍♂️ Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   node server.js
   ```
   The API will be available at `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
t-shirt-store/
├── backend/              # Node.js/Express API server
│   ├── config/          # Database configuration
│   ├── middleware/      # Authentication & error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Server entry point
│   └── README.md        # Backend documentation
├── frontend/             # React application
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   └── config/      # Configuration files
│   ├── package.json     # Dependencies
│   └── README.md        # Frontend documentation
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_url
JWT_SECRET=your_super_secret_jwt_key_here_make_it_strong
PORT=5000

# Optional - Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=T-Shirt Store
```

## 📚 API Documentation

The backend provides RESTful APIs for:
- User authentication and profile management
- Product CRUD operations
- Shopping cart management
- Order processing and history
- Admin dashboard functionality

See [backend/README.md](backend/README.md) for detailed API endpoints.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For questions or support, please open an issue in the repository or contact the development team.

---

*Frontend documentation: [frontend/README.md](frontend/README.md)*
*Backend documentation: [backend/README.md](backend/README.md)*


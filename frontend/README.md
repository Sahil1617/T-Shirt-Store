# T-Shirt Store Frontend

A modern, responsive e-commerce frontend for a t-shirt store built with React and Vite.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Product Browsing**: View and filter t-shirts by categories, sizes, and prices
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Secure order placement
- **Order History**: View past orders and order details
- **Admin Dashboard**: Manage products, orders, and users (admin access required)
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live cart updates and notifications

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Notification system
- **Three.js & Postprocessing** - 3D graphics and effects
- **Heroicons & Lucide React** - Icon libraries

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (copy from `.env` if exists):
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_APP_NAME=T-Shirt Store
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   ├── products/   # Product-related components
│   │   └── ui/         # Generic UI components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin pages
│   │   └── auth/       # Authentication pages
│   ├── config/         # Configuration files
│   └── main.jsx        # Application entry point
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## API Integration

The frontend communicates with a backend API running on `http://localhost:5000`. Make sure the backend is running before starting the frontend.

## Contributing

1. Follow the existing code style and structure
2. Use meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is licensed under the MIT License.

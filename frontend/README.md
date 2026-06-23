# Product Management CRUD Frontend

A modern, responsive React + Vite frontend for managing products with a Node.js + Express + MongoDB backend.

## 🚀 Features

- **React 18** with modern hooks (useState, useEffect)
- **Vite** for fast development and optimized builds
- **React Router** for client-side navigation
- **Axios** for API communication
- **Responsive Design** - Mobile-friendly UI
- **Modern Components** - Reusable, well-organized components
- **Form Validation** - Client-side validation for product forms
- **Error Handling** - User-friendly error messages
- **Success Notifications** - Visual feedback for user actions
- **Loading States** - Loading indicators for API calls

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation component
│   │   ├── ProductTable.jsx     # Products table display
│   │   ├── ProductForm.jsx      # Reusable form component
│   │   ├── Loading.jsx          # Loading spinner
│   │   ├── ErrorMessage.jsx     # Error alert
│   │   ├── SuccessMessage.jsx   # Success notification
│   │   └── DeleteConfirmation.jsx # Delete modal
│   ├── pages/
│   │   ├── Home.jsx             # Home/Dashboard page
│   │   ├── ProductList.jsx      # Products list page
│   │   ├── AddProduct.jsx       # Add product page
│   │   └── EditProduct.jsx      # Edit product page
│   ├── services/
│   │   └── api.js               # Axios API service
│   ├── styles/
│   │   ├── index.css            # Global styles
│   │   ├── app.css              # App layout
│   │   ├── navbar.css           # Navbar styles
│   │   ├── home.css             # Home page styles
│   │   ├── products.css         # Products page styles
│   │   ├── table.css            # Table styles
│   │   ├── form.css             # Form styles
│   │   ├── modal.css            # Modal styles
│   │   ├── loading.css          # Loading styles
│   │   └── alert.css            # Alert styles
│   ├── App.jsx                  # Main app component with routing
│   └── main.jsx                 # Entry point
├── public/                      # Static assets
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── index.html                  # HTML template
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create/Update .env file:**
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   The frontend will open at `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

To preview the production build:
```bash
npm run preview
```

## 🔗 API Integration

The frontend connects to the backend API at `http://localhost:3000` using Axios.

### Available API Endpoints

The app uses the following endpoints:

- **GET** `/api/products` - Fetch all products
- **GET** `/api/products/:id` - Fetch single product
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product

All requests include proper error handling and user feedback.

## 🎨 Styling

The app uses modern CSS with:
- CSS Variables for theming
- Responsive design with media queries
- Smooth transitions and animations
- Accessible color contrast
- Mobile-first approach

### Color Scheme

- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Danger: Red (#ef4444)
- Warning: Amber (#f59e0b)

## 🔄 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Dashboard/home page |
| `/products` | ProductList | Display all products |
| `/products/add` | AddProduct | Add new product |
| `/products/edit/:id` | EditProduct | Edit existing product |

## 📝 Components

### ProductTable
Displays products in a responsive table with actions (edit, delete).

### ProductForm
Reusable form for adding and editing products with validation.

### DeleteConfirmation
Modal dialog for confirming product deletion.

### ErrorMessage / SuccessMessage
Alert components for displaying feedback.

### Loading
Spinner component for loading states.

## 🚦 Usage

1. **View Products**: Navigate to `/products` to see all products
2. **Add Product**: Click "Add Product" button, fill the form, and submit
3. **Edit Product**: Click the "Edit" button on any product row
4. **Delete Product**: Click "Delete" button and confirm deletion

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | http://localhost:3000 |

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on http://localhost:3000
- Check `.env` file for correct API URL
- Verify backend has CORS enabled

### Port already in use
- Change Vite port in `vite.config.js`
- Or kill the process using port 5173

### Module not found errors
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall if issues persist

## 📚 Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client for API requests

## 🧪 Development

To work with the development server:

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

---

**Happy coding!** 🎉

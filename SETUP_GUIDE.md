# CRUD App - Setup & Deployment Guide

## 📋 Overview

Your CRUD application consists of:
- **Backend**: Node.js + Express + MongoDB (Port 3000)
- **Frontend**: React + Vite (Port 5173)

---

## 🚀 Quick Start

### Backend Setup & Running

The backend is already configured. To start it:

```bash
# From root directory (crud-app)
npm start
```

**Backend runs at:** `http://localhost:3000`

### Frontend Setup & Running

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs at:** `http://localhost:5173`

---

## 📂 Project Structure

```
crud-app/
├── server.js                 # Express server
├── package.json             # Backend dependencies
├── .env                     # Backend environment variables
├── README.md                # Backend documentation
└── frontend/
    ├── src/
    │   ├── components/      # Reusable React components
    │   ├── pages/          # Page components
    │   ├── services/       # API service (axios)
    │   ├── styles/         # CSS files
    │   ├── App.jsx         # Main app with routing
    │   └── main.jsx        # Entry point
    ├── public/             # Static assets
    ├── package.json        # Frontend dependencies
    ├── vite.config.js      # Vite configuration
    ├── index.html          # HTML template
    ├── .env                # Frontend environment variables
    └── README.md           # Frontend documentation
```

---

## 🔗 Connection Details

### Frontend to Backend Communication

The frontend connects to the backend using:
- **Base URL**: `http://localhost:3000`
- **API Prefix**: `/api`
- **Library**: Axios

### Environment Variables

**Backend (.env):**
```
MONGO_URI=mongodb://127.0.0.1:27017/crud-app
PORT=3000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3000
```

---

## 📡 API Endpoints

The frontend uses these endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

## 🎨 Frontend Features

### Pages
- **Home** (`/`) - Dashboard with feature overview
- **Products** (`/products`) - List all products
- **Add Product** (`/products/add`) - Create new product
- **Edit Product** (`/products/edit/:id`) - Update product

### Components
- **Navbar** - Navigation with links
- **ProductTable** - Responsive table display
- **ProductForm** - Reusable form with validation
- **DeleteConfirmation** - Delete confirmation modal
- **Loading** - Loading spinner
- **ErrorMessage** - Error alerts
- **SuccessMessage** - Success notifications

### Styling
- Modern, responsive design
- Mobile-friendly layout
- CSS variables for easy theming
- Smooth animations and transitions
- Accessible color contrast

---

## 🔐 Data Model

### Product Schema (MongoDB)

```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  price: Number (required, min: 0),
  inStock: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Form Fields

- **Name** - Product name (required)
- **Description** - Product description (optional)
- **Price** - Product price in USD (required, must be > 0)
- **In Stock** - Availability status (checkbox)

---

## 🧪 Testing the Application

### 1. Start Backend
```bash
npm start
```
Check: `http://localhost:3000` shows API running message

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
Browser opens at `http://localhost:5173`

### 3. Test CRUD Operations

**Create**: 
1. Click "Add Product"
2. Fill in product details
3. Click "Add Product"

**Read**:
1. Go to Products page
2. See all products in table

**Update**:
1. Click "Edit" on any product
2. Modify details
3. Click "Update Product"

**Delete**:
1. Click "Delete" on any product
2. Confirm deletion in modal

---

## 🛠️ Development Tips

### Hot Reload
The frontend has hot module replacement (HMR). Changes are reflected instantly during development.

### API Service
API calls are centralized in `src/services/api.js`:
```javascript
import { productAPI } from './services/api'

// Usage
const products = await productAPI.getAll()
await productAPI.create(formData)
await productAPI.update(id, formData)
await productAPI.delete(id)
```

### Form Validation
ProductForm includes client-side validation for:
- Required fields
- Price > 0

### Error Handling
All API calls have error handling with user-friendly messages displayed in alerts.

---

## 📦 Build for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Creates optimized `dist/` folder for deployment.

### Backend Deployment
Ensure environment variables are set on your server and MongoDB is accessible.

---

## 🐛 Troubleshooting

### Issue: Can't connect to backend
**Solution**:
- Verify backend is running: `http://localhost:3000`
- Check `.env` in frontend has correct URL
- Ensure CORS is enabled in backend (already is)

### Issue: MongoDB connection error
**Solution**:
- Ensure MongoDB is running: `mongod --dbpath C:\data\db`
- Check MONGO_URI in backend .env

### Issue: Port already in use
**Solution**:
- For frontend: Edit `vite.config.js` and change port
- For backend: Edit server.js and change PORT

### Issue: Module not found
**Solution**:
```bash
cd frontend
rm -r node_modules
npm install
```

---

## 📚 Additional Resources

### Frontend
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

### Backend
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)

---

## ✨ Next Steps

1. ✅ Frontend created with React + Vite
2. ✅ All components built and styled
3. ✅ API service configured
4. ✅ Routing set up
5. 🎯 Next: Install dependencies and test the application

Run these commands to get started:
```bash
# Terminal 1: Start Backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev
```

Your CRUD app will be fully functional! 🚀

---

## 📞 Support

For issues or questions:
1. Check the README.md files in both root and frontend directories
2. Review the component files - they're well-commented
3. Check browser console for detailed error messages
4. Verify backend and frontend are both running

Happy coding! 💻

import TwoFactor from './pages/TwoFactor'
import AuthCallback from './pages/AuthCallback'
import BlogDetails from './pages/BlogDetails'

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Login from './pages/Login'
import Blogs from './pages/Blogs'

import { authService } from './services/auth'
import { userAPI } from './services/api'

import './styles/app.css'


export default function App() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pendingUser, setPendingUser] = useState(null)


  useEffect(() => {

    const savedUser = authService.getCurrentUser()
    const savedPendingUser = authService.getPending2FAUser()


    console.log(
      "Loaded user:",
      savedUser,
      "Loaded pending 2FA user:",
      savedPendingUser
    )


    if(savedUser){
      setUser(savedUser)
    }


    if(savedPendingUser){
      setPendingUser(savedPendingUser)
    }


    setLoading(false)


  }, [])



  const handleAuth = (authenticatedUser) => {

    if(!authenticatedUser){
      return
    }


    console.log(
      "Authenticated user:",
      authenticatedUser
    )


    authService.setPending2FA(authenticatedUser)

    setPendingUser(authenticatedUser)

  }



  const handle2FAVerified = () => {

    console.log("2FA completed")


    const verifiedUser = authService.getCurrentUser()


    if(verifiedUser){
      setUser(verifiedUser)
    }


    setPendingUser(null)

    authService.clearPending2FA()

  }



  const handleUpdateUser = (updates) => {

    if(!user){
      return
    }


    const updatedUser = {
      ...user,
      ...updates
    }


    setUser(updatedUser)

    authService.setCurrentUser(updatedUser)



    if(updates.selectedAvatar !== undefined && user._id){

      userAPI
      .updateProfile(
        user._id,
        updates.selectedAvatar
      )
      .catch(err=>{
        console.error(
          "Failed to save avatar:",
          err
        )
      })

    }

  }



  const handleLogout = async()=>{

    await authService.logout()

    setUser(null)

    window.location.href="/login"

  }




  if(loading){

    return(
      <div>
        Loading...
      </div>
    )

  }



  return (

    <Router>

      <div className="app">


        <Navbar
          user={user}
          onLogout={handleLogout}
        />



        <main className="main-content">


          <Routes>


            {/* Login */}

            <Route
              path="/login"
              element={
                <Login
                  onAuth={handleAuth}
                  user={user}
                />
              }
            />



            {/* Auth Callback */}

            <Route
              path="/auth/callback"
              element={
                <AuthCallback
                  onAuth={handleAuth}
                />
              }
            />




            {/* Home */}

            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home
                    user={user}
                    onUpdateUser={handleUpdateUser}
                  />
                </ProtectedRoute>
              }
            />





            {/* Products */}

            <Route
              path="/products"
              element={
                <ProtectedRoute user={user}>
                  <ProductList />
                </ProtectedRoute>
              }
            />



            <Route
              path="/products/add"
              element={
                <ProtectedRoute user={user}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />



            <Route
              path="/products/edit/:id"
              element={
                <ProtectedRoute user={user}>
                  <EditProduct />
                </ProtectedRoute>
              }
            />






            {/* Blogs List */}

            <Route
              path="/blogs"
              element={
                <ProtectedRoute user={user}>
                  <Blogs />
                </ProtectedRoute>
              }
            />





            {/* Single Blog Details */}

            <Route
              path="/blogs/:slug"
              element={
                <ProtectedRoute user={user}>
                  <BlogDetails />
                </ProtectedRoute>
              }
            />







            {/* Two Factor */}

            <Route
              path="/2fa"
              element={
                <ProtectedRoute user={user || pendingUser}>

                  <TwoFactor
                    user={user || pendingUser}
                    loginMode={
                      (user || pendingUser)
                      ?.twoFactorEnabled === true
                    }
                    onVerified={handle2FAVerified}
                  />

                </ProtectedRoute>
              }
            />





            {/* Redirect */}

            <Route
              path="*"
              element={
                <Navigate to="/" />
              }
            />



          </Routes>



        </main>





        <footer className="app-footer">

          <p>
            © 2024 Product Management System
          </p>

        </footer>




      </div>


    </Router>

  )

}
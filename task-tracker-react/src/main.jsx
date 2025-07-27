import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import TasksView from './tasksView.jsx'
import './index.css'
import App from './App.jsx'
import LoginPage from './loginPage.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}/>
          <Route path='/projects/:projectId' element={<ProtectedRoute><TasksView /></ProtectedRoute>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

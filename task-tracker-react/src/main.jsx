import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import TasksView from './tasksView.jsx'
import './index.css'
import App from './App.jsx'
import LoginPage from './loginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path="/" element={<App />}/>
          <Route path='/projects/:projectId' element={<TasksView />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

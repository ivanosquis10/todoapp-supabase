import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import { TaskContextProvider } from './context/TaskContext'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { supabase } from './supabase/supabase'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // si el usuario no esta autenticado, se envia al login
      if (!session) {
        console.log(event, session)
        navigate('/login')
      } else {
        // caso contrario, se va al home
        navigate('/')
      }
    })
  }, [navigate])

  return (
    <TaskContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </TaskContextProvider>
  )
}

export default App

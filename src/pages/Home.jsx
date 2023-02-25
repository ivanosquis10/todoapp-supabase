import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import useTask from '../hooks/useTask'
import { supabase } from '../supabase/supabase'

export default function Home() {
  // const [showTasksDone, setShowTasksDone] = useState(false)

  const { toggleTaskDone, showTasksDone:done } = useTask()

  const navigate = useNavigate()

  useEffect(() => {
    async function getSupabaseUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user === null) {
        console.log('/login vas a login')
        navigate('/login')
      }
    }

    getSupabaseUser()
  }, [navigate])

  return (
    <div className="mt-[5rem] py-5 px-3">
      <h1 className="text-center sm:text-2xl uppercase font-bold">
        Bienvenido - agrega tus tareas🔥
      </h1>

      <TaskForm />
      <TaskList />
    </div>
  )
}

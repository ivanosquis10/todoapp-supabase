import { createContext, useState } from 'react'
import { supabase } from '../supabase/supabase'

export const TaskContext = createContext()

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [adding, setAdding] = useState(false)

  const [loading, setLoading] = useState(false)
  const [showTasksDone, setShowTasksDone] = useState(false)

  function toggleTaskDone() {
    setShowTasksDone(!showTasksDone)
  }

  async function getUserSB() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return console.log(user)
  }

  // funcion que se va a encargar de traer las tareas de la bd
  async function getTasks(done = false) {
    setLoading(true)

    try {
      // tenemos que traer la informacion del usuario para validarlo con la tarea y traer solo las tareas de ese usuario en concreto
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // function qu traera las tareas de la bd, con el 'eq' se valida que se traigan solo las tareas que pertenecen a ese id, para asi no traer tareas de otros usuarios
      const { error, data } = await supabase
        .from('task')
        .select()
        .eq('userId', user.id)
        .eq('done', done)
        .order('id', { ascending: true })

      if (error) throw error

      setTasks(data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  // function que se va a encargar de crear la tareas e insertarlas en la bd
  async function createTask(taskName) {
    setAdding(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error, data } = await supabase
        .from('task')
        .insert({
          name: taskName,
          userId: user.id,
        })
        .select()

      setTasks([...tasks, ...data])

      if (error) {
        throw error
      }
    } catch (e) {
      console.error(e)
    } finally {
      setAdding(false)
    }
  }

  // funcion que se va a encargar de eliminar las tareas
  async function deleteTask(id) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // console.log(user)

      const { error, data } = await supabase
        .from('task')
        .delete()
        .eq('userId', user.id)
        .eq('id', id)

      if (error) throw error

      setTasks(tasks.filter((task) => task.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  // function que se va a encargar de actualizar en la bd el campo 'done', esto es para ver si la tarea esta hecha o no
  async function updateTask(id, updFields) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // console.log(user)

      const { data, error } = await supabase
        .from('task')
        .update(updFields)
        .eq('userId', user.id)
        .eq('id', id)

      if (error) throw error

      // actualizar el estado con las tareas que no tengan el done = true, es decir, va a mostrar las tareas que tenga el done = false
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  // function para cerrar sesion
  async function logout() {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
    } catch (e) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithMagicLink(email) {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      })
      if (error) throw error
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
      alert('revisa tu email')
    }
  }

  return (
    <TaskContext.Provider
      value={{
        getUserSB,
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
        showTasksDone,
        toggleTaskDone,
        logout,
        signInWithMagicLink,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

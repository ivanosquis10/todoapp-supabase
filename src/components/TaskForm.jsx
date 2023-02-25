import { useState } from 'react'
import useTask from '../hooks/useTask'
import Loading from './Loading'

export default function TaskForm() {
  const [taskName, setTaskName] = useState('')
  const [error, setError] = useState('')

  const { createTask, adding, showTasksDone: done } = useTask()

  async function handleSubmit(e) {
    e.preventDefault()
    if (taskName === '') {
      return setError('El campo es obligatorio...')
    }
    try {
      await createTask(taskName)
      setError('')
      setTaskName('')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <section
      className={` ${
        done ? 'hidden' : ''
      } mt-8 flex flex-col justify-center items-center`}
    >
      <h2 className="text-center sm:text-xl uppercase font-bold tracking-wider mb-4">
        ⬇️Aqui puedes agregar tus tareas⬇️
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full sm:w-5/12 gap-1"
      >
        {error && <p>{error}</p>}
        <label className="text-lg font-bold mb-2" htmlFor="task">
          Tarea:
        </label>
        <input
          type="text"
          name="task"
          id="task"
          placeholder="Ej: Pasear al perro..."
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          autoComplete="off"
          required
          className="px-2 py-2 bg-transparent shadow shadow-slate-800 rounded-lg border-2 border-indigo-700 mb-2 outline-none"
        />

        <button
          className="font-bold uppercase sm:text-lg bg-slate-700/50 hover:bg-slate-700/80 ease-in-out duration-300 px-2 py-1 border-2 border-indigo-700 rounded-lg shadow-md mt-1 outline-none"
          disabled={adding}
        >
          {adding ? <Loading msg="Agregando" direction='center' /> : 'Agregar Tarea'}
        </button>
      </form>
    </section>
  )
}

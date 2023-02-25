import { useEffect, useState } from 'react'
import useTask from '../hooks/useTask'
import Loading from './Loading'
import TaskCard from './TaskCard'

export default function TaskList() {
  // importamos el contexto que tendra la llamada a la bd e iteramos

  const {
    tasks,
    getTasks,
    loading,
    showTasksDone: done,
    toggleTaskDone,
  } = useTask()

  useEffect(() => {
    getTasks(done)
  }, [done])

  function renderTasks() {
    if (loading) {
      return <Loading msg="cargando tareas" direction="start" pdy={5} />
    } else if (tasks.length === 0) {
      return <p>Agrega una tarea!</p>
    } else {
      return tasks.map((task) => <TaskCard key={task.id} task={task} />)
    }
  }

  return (
    <main className="grid sm:grid-cols-3 gap-4 mt-10 ">
      <div className="sm:col-span-3 ">
        <h3 className=" text-center sm:text-2xl border-2 border-indigo-600 border-dashed uppercase font-bold tracking-wider mb-2 mt-10">
          Lista de las tareas
        </h3>
        <button
          className="font-bold uppercase bg-slate-700/50 hover:bg-slate-700/80 ease-in-out duration-300 px-2 rounded shadow-md"
          onClick={toggleTaskDone}
        >
          {done ? <p>ver tareas pendientes</p> : <p>ver tareas hechas</p>}
        </button>
      </div>
      {renderTasks()}
    </main>
  )
}

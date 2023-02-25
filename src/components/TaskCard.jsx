import useTask from '../hooks/useTask'

export default function TaskCard({ task }) {
  const { name, done, id } = task

  const { deleteTask, updateTask } = useTask()

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleToggleDone = async () => {
    await updateTask(id, { done: !done })
  }

  return (
    <section className="rounded-lg border-2 border-dotted border-indigo-500 flex flex-col justify-center items-center p-5 text-center">
      <div>
        <p className="font-medium text-slate-500">
          Tarea: <span className="font-bold text-slate-200">{name}</span>
        </p>
        <p className="font-medium text-slate-500">
          Estado:{' '}
          <span className="font-bold text-slate-200">
            {done ? 'Terminada✅' : 'No terminada😿'}
          </span>
        </p>
      </div>

      <div className='flex gap-4 items-center mt-5'>
        <button className='uppercase font-bold text-slate-300 bg-slate-700/50 hover:bg-slate-700/80 ease-in-out duration-300 px-2 rounded-lg shadow-md outline-none' onClick={handleDelete}>Delete ❌</button>
        <button className='uppercase font-bold text-slate-300 bg-slate-700/50 hover:bg-slate-700/80 ease-in-out duration-300 px-2 rounded-lg shadow-md outline-none' onClick={handleToggleDone}>Done ✅</button>
      </div>
    </section>
  )
}

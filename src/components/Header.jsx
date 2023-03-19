import { useLocation } from 'react-router-dom'
import useTask from '../hooks/useTask'

export default function Header() {
  const location = useLocation()
  const { logout } = useTask()

  return (
    <header className="relative w-full">
      <nav className="fixed top-0 left-0 z-20 w-full px-6 transition-all duration-100 lg:px-12 py-2 shadow backdrop-blur bg-slate-800/60">
        <div className="h-16 flex items-center justify-between">
          <div className="">
            <h1 className="sm:text-2xl uppercase font-bold">App de tareas❤️</h1>
          </div>
          {location.pathname !== '/login' && (
            <div className="">
              <button
                className="font-bold uppercase sm:text-lg bg-slate-700/50 hover:bg-slate-700/80 ease-in-out duration-300 px-2 rounded"
                onClick={logout}
              >
                Cerrar sesion😿
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

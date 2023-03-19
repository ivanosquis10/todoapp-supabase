import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/supabase'
import useTask from '../hooks/useTask'

export default function Login() {
  const [email, setEmail] = useState('')
  const { loading, signInWithMagicLink } = useTask()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    signInWithMagicLink(email)
  }

  async function getSupabaseUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user !== null) {
      console.log('/home vas a home')
      navigate('/')
    }
  }

  useEffect(() => {
    getSupabaseUser()
  }, [navigate])

  return (
    <div className="mt-20 flex flex-col items-center p-10 ">
      <h2 className="sm:text-2xl uppercase font-bold tracking-wider mb-4">
        Bienvenido - ⬇️registrate aqui⬇️
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-5/12 mt-5 flex flex-col justify-center items-center gap-2"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.here"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-2 py-2 bg-transparent shadow shadow-slate-800 rounded-lg border-2 border-indigo-700 mb-2 outline-none focus:bg-transparent"
          required
        />

        <button
          className="w-full font-bold uppercase sm:text-lg bg-slate-700/50 hover:bg-slate-700/80 ease-in-out duration-300 px-2 py-1 border-2 border-indigo-700 rounded-lg shadow-md mt-1 outline-none"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

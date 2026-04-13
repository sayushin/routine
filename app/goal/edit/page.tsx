'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase"

const GoalEdit = () => {

const [period,setPeriod] = useState('')
const [title,setTitle] = useState('')
const [goal,setGoal] = useState('')

const handleInput = async ()=>{
    const {error} = await supabase
    .from('Goal')
    .insert([
        {
            period:String(period),
            title:String(title),
            goal:String(goal),
        }
    ])

    if(error) {
        console.error(error)
        alert('Failed to save')
        return
    }

    alert('Saved')

    }

  return (
    <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Period
  </label>
  <input 
  type="text"
  value={period}
  onChange={(e) => setPeriod(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
    <label className="mb-2 block text-sm font-medium text-slate-700">
    Title
  </label>
  <input 
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
    <label className="mb-2 block text-sm font-medium text-slate-700">
    Goal
  </label>
  <input 
  type="text"
  value={goal}
  onChange={(e) => setGoal(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />

<button
type="button"
onClick={handleInput}
className="mt-4 w-full rounded-xl bg-blue-600 p-3 text-white"
>
Save Goal
</button>
</div>
)}

export default GoalEdit
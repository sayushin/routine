'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useSearchParams } from "next/navigation"


const InputForm = () => {
const router = useRouter()
const searchParams = useSearchParams()

const [id, setId] = useState<string | null>(null)
const [date,setToday] = useState(new Date().toLocaleDateString('sv-SE'))
const [weight, setWeight] = useState('')
const [englishMinutes, setEnglishMinutes] = useState('')
const [programmingMinutes, setProgrammingMinutes] = useState('')
const [trainingMinutes, setTrainingMinutes] = useState('')
const [memo, setMemo] = useState('')

useEffect(()=> {
    const editId = searchParams.get('id')
    if(!editId) return

    setId(editId)
    setToday(searchParams.get('date') ?? new Date().toLocaleDateString('sv-SE'))
    setWeight(searchParams.get('weight') ?? '')
    setEnglishMinutes(searchParams.get('englishMinutes') ?? '')
    setProgrammingMinutes(searchParams.get('programmingMinutes') ?? '')
    setTrainingMinutes(searchParams.get('trainingMinutes') ?? '')
    setMemo(searchParams.get('memo') ?? '') 
},[searchParams])

const handleSave = async () => {
    if(id){
        const {error} = await supabase
        .from('Routine')
        .update({
            date,
            weight:Number(weight),
            englishMinutes:Number(englishMinutes),
            programmingMinutes:Number(programmingMinutes),
            trainingMinutes:Number(trainingMinutes),
            memo,
        })
        .eq('id',Number(id))

        if(error){
            console.error(error)
            alert(`Failed to update: &{error.message}`)
            return
        }

        alert('Updated successfully')
        router.push('/result')
        return
    }

   const {error} = await supabase.from('Routine')
   .insert([
    {
        date,
        weight: Number(weight),
        englishMinutes:Number(englishMinutes),
        programmingMinutes:Number(programmingMinutes),
        trainingMinutes:Number(trainingMinutes),
        memo
    }
   ])

   if(error) {
    console.error(error)
    alert('Failed to save')
    return
   }

   alert('Complete saving')
   router.push('/result')

  localStorage.setItem('date',date)  
  localStorage.setItem('weight',weight)
  localStorage.setItem('englishMinutes',englishMinutes)
  localStorage.setItem('programmingMinutes',programmingMinutes)

  console.log({
    weight,
    englishMinutes,
    programmingMinutes
  })
  
}

  return (
    <div>
<h2 className="my-6 font-bold text-xl bg-blue-200 p-2">
  Input Fields
</h2>
<div className="my-6 md:w-1/3">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Date
  </label>
  <input 
  type="date"
  value={date}
  onChange={(e) => setToday(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
</div>

<div className="grid gap-4 md:grid-cols-4">


<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Weight(kg)
  </label>
  <input 
  type="number"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    English(minutes)
  </label>
  <input 
  type="number"
  value={englishMinutes}
  onChange={(e) => setEnglishMinutes(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Programming(minute)
  </label>
  <input 
  type="number"
  value={programmingMinutes}
  onChange={(e) => setProgrammingMinutes(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Training(minute)
  </label>
  <input 
  type="number"
  value={trainingMinutes}
  onChange={(e) => setTrainingMinutes(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
</div>

</div>

<div>
  <label className="mt-4 mb-2 block text-sm font-medium text-slate-700">
    Memo
  </label>
  <textarea 
  value={memo}
  onChange={(e) => setMemo(e.target.value)}
  rows={2}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 outline-none transition focus:border-slate-500 p-2"
  />
</div>

<button 
type="button"
onClick={handleSave}
className="rounded-xl bg-slate-900 px-4 py-3 font-medium text-white text-xl my-6 w-full">
  submit
</button>

    </div>
  )
}

export default InputForm
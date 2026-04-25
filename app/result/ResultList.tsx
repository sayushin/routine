'use client'

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Props = {
    initialData:any[]
    totalTraining:number
}

const ResultList = ({ initialData,totalTraining }: Props) => {
const router = useRouter()

const totalEnglish = initialData.reduce(
    (sum,item) => sum + Number(item.englishMinutes ?? 0),
    0
)

const totalProgramming = initialData.reduce(
    (sum,item) => sum + Number(item.programmingMinutes ?? 0),
    0
)


const handleDelete = async (id:number) => {
    const ok = window.confirm('Do you delete the record?')
    if(!ok) return

    const { error } = await supabase
        .from('Routine')
        .delete()
        .eq('id',id)

    if(error) {
        console.error(error)
        alert(`Delete failed:${error.message}`)
        return
    }

    alert('Deleted')
    router.push('/result')
}

const handleUpdate = (item: any) =>{
    const params = new URLSearchParams({
        id:String(item.id ?? ''),
        date:item.date ?? '',
        weight: String(item.weight ?? ''),
        englishMinutes: String(item.englishMinutes ?? ''),
        programmingMinutes:String(item.programmingMinutes ?? ''),
        trainingMinutes:String(item.trainingMinutes ?? ''),
        memo:item.memo ?? '',
    })

    router.push(`/input?${params.toString()}`)
}

  return (
 <main className="min-h-screen bg-gray-100 p-8">
<div className="mx-auto max-w-3xl space-y-4">
 <h1 className="text-3xl font-bold">Result</h1>
 <div className="rounded-xl bg-white p-4 shadow">
    <h2 className="mb-2 text-xl font-bold">Total</h2>
    <div className="grid gap-3 grid-cols-3">

<div className="rounded-xl bg-gray-50 shadow text-center p-2">
    <p><strong>Training:</strong></p>
    <p>
    {totalTraining} minutes
    </p>
</div>
<div className="rounded-xl bg-gray-50 shadow text-center p-2">
    <p><strong>English:</strong></p>
    <p>{totalEnglish} minutes</p>
</div>
<div className="rounded-xl bg-gray-50 shadow text-center p-2">
    <p><strong>Programming:</strong></p>
    <p>{totalProgramming} minutes</p>
</div>
        </div>

 </div>

{initialData.map((item:any)=> (
<div key={item.id} className="rounde-xl bg-white p-4 shadow">
 <p><strong>Date:</strong>{item.date}</p>
 <p><strong>Training:</strong>{item.trainingMinutes} minutes</p>
 <p><strong>English:</strong>{item.englishMinutes} minutes</p>
<p><strong>Programming:</strong>{item.programmingMinutes} minutes</p>
 <p><strong>Memo:</strong>{item.memo}</p>

 <div className="mt-4 flex gap-3">
    <button
    type="button"
    onClick={() => handleDelete(item.id)}
    className="rounded-lg bg-red-600 px-4 py-2 text-white"
    >
        Delete
    </button>
        <button
    type="button"
    onClick={() => handleUpdate(item)}
    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
    >
        Update
    </button>
 </div>
 </div>
))}
 </div>
 </main>
  )
}

export default ResultList
import Link from "next/link"
import { supabase } from "@/lib/supabase"

const Home = async () => {
const { data:goals, error } = await supabase
.from("Goal")
.select("*")

if(error) {
  return <div>Data Fetching Error: {error.message}</div>
}

  return (
    
    <main className="min-h-screen bg-gray-100 p-8">

    <div className="max-w-3xl mx-auto">
<h1 className="text-3xl font-bold mb-6">
  Routine Dashboard
</h1>
<h2 className="mb-6 font-bold text-xl bg-blue-200 p-2">
  Goal : {goals[0]?.period}
</h2>
<div className="grid gap-4 md:grid-cols-3">
  {goals.map((item:any) => (
  <div key={item.id} className="bg-white rounded-xl shadow p-4">
    <p className="text-gray-500">{item.title}</p>
    <p className="text-2xl font-bold">{item.goal}</p>
  </div>
  ))
  }
</div>
<Link 
  href="/input"
  className="block rounded-lg bg-blue-600 p-4 text-white my-6 w-full text-xl">
  Record Routines
</Link>
<Link 
  href="/goal/edit"
  className="block rounded-lg bg-gray-400 p-4 text-white my-10 w-full text-xl">
  Set Goals
</Link>

</div>
</main>  
)
}

export default Home
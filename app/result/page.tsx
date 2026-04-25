export const dynamic = 'force-dynamic'

import { supabase } from "@/lib/supabase"
import ResultList from "./ResultList"

const Result = async () => {
const {data,error} = await supabase
.from('Routine')
.select('*')
.order('date',{ascending:false})

if(error) {
    console.error(error)
    return <div>Failed to load</div>
}

return <ResultList initialData={(data ?? [])} />

}

export default Result
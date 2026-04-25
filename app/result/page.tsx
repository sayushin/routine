export const dynamic = 'force-dynamic'

import { supabase } from "@/lib/supabase"
import ResultList from "./ResultList"

const Result = async () => {
const {data,error} = await supabase
.from('Routine')
.select('*')
.order('date',{ascending:false})

const totalTraining = data?.reduce(
    (sum,item) => sum + Number(item.trainingMinutes ?? 0),
    0
) ?? 0

const totalEnglish = data?.reduce(
    (sum,item) => sum + Number(item.englishMinutes ?? 0),
    0
) ?? 0

const totalProgramming = data?.reduce(
    (sum,item) => sum + Number(item.programmingMinutes ?? 0),
    0
) ?? 0

if(error) {
    console.error(error)
    return <div>Failed to load</div>
}
console.log("totalTraining",totalTraining)

return (
<ResultList 
    initialData={(data ?? [])}
    totalTraining={totalTraining}
    totalEnglish={totalEnglish}
    totalProgramming={totalProgramming}
/>
)
}

export default Result
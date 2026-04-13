import { Suspense } from "react";
import InputForm from "./InputForm";

const InputPage = () => {
  return (
    <Suspense fallback={<div>Loading... </div>}>
        <InputForm />
    </Suspense>

  )
}

export default InputPage




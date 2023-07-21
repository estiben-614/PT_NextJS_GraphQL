
'use client'

import { useGetPrediosQuery } from "../../redux/api/Predios/predioApi"

export default function Home() {
  const {data}=useGetPrediosQuery()
  console.log(data)
  return (
  <>
  <h1>Page</h1>
  </>
  )
}

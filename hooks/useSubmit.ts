import { useCallback } from "react"
import type { Data } from "../components/typings"

export const useSubmit = () => {
  const onSubmit = useCallback(async (data: Data) => {
    const res = await fetch("/api/emails", {
      method: "POST",
      body: JSON.stringify(data)
    })
    return res
  }, [])
  return onSubmit
}
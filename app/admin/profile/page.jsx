"use client"

import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  router.replace("/admin/profile/orders")
  return (
    <div>Redirecting...</div>
  )
}

export default Page
// "use client"

import { redirect } from 'next/navigation';

// import { useRouter } from "next/navigation"

const Page = () => {
  redirect("/admin/profile/products")
  return (
    <div>Redirecting...</div>
    )
}

export default Page
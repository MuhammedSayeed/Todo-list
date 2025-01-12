import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className="w-full flex justify-center pt-10">
    <SignIn afterSignInUrl={"/"} />
  </div>
}
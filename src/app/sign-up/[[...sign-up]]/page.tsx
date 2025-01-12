import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className="w-full flex justify-center pt-10">
      <SignUp afterSignInUrl={"/"} />
    </div>
}
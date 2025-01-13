import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from './Mode.Toggle';
export default function Header() {
  return (
    <header className="border-b">
      <div className="container px-4 md:px-0 mx-auto flex h-16 items-center justify-between">
        <div className="w-full flex items-center justify-between gap-4">
          <ModeToggle />
          <div>
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
import { UserMenu } from "./user-menu"

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-64 h-14 
                       border-b bg-background z-10 
                       flex items-center justify-end px-6">
      <UserMenu />
    </header>
  )
}
import { Input } from "@/components/ui/input"

export function signupForum() {
  return( //input from shadcn
    <div>
      <Input type="UserName" placeholder="user name" />
      <Input type="password" placeholder="password" />
      <Input type="password" placeholder="please repeat password" />
    </div>
  )
}

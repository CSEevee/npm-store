import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useNavigate } from "react-router-dom"

export default function LoginForm() {
  const navigate = useNavigate();
  
  //this will be a post request to http:localhost3001/login
const handleLogin = async (username: string, userpassword: string) => {
  try {
    const response = await fetch ('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, userpassword })
    })

    if (response.status === 200) {
      navigate('/home');
      console.log('Log in successful');
    }   
  } catch (error) {
    console.log(`Issue logging in: ${error}`);
  }
};

  function createUser() {
    //this will be a post request to http:localhost3000/login
  }


  return (
    <div className="flex items-center justify-center min-h-screen pb-[300px]">
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Log into your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin}>Log in</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Sign-Up</CardTitle>
            <CardDescription>
              Create your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Username</Label>
              <Input id="current" type="text" placeholder="Username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input id="new" type="password" placeholder="Password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={createUser}>Create User</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

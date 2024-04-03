import { useState } from 'react';
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

  const [ username, setUsername] = useState('');
  const [ userpassword, setUserPassword] = useState('');

  function updateUsername(event) {
    setUsername(event.target.value); 
  }
  
  function updatePassword(event) {
    setUserPassword(event.target.value);
  }
  
  async function handleLogin() {
    try {
      const response = await fetch('/server/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, userpassword })
      });
      
      if (response.ok) {
        navigate('/home');
        console.log('Log in successful');
      } else {
        console.log('login failed');
      }
    } catch (error) {
      console.log(`Problem with login: ${error}`);
    }
  }

  async function createUser() {
    //this will be a post request to http:localhost3001/login
    try {
      const response = await fetch('/server/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, userpassword })
      });
      
      if (response.ok) {
        navigate('/home');
        console.log('Sign Up Successful');
      } else {
        console.log('Sign Up Failed');
      }
    } catch (error) {
      console.log(`Problem with sign up: ${error}`);
    }
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
              <Input id="username" onChange={updateUsername} placeholder="Username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" onChange={updatePassword} type="password" placeholder="Password" />
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
              Creat your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Username</Label>
              <Input id="current" onChange={updateUsername} placeholder="Username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input id="new" onChange={updatePassword} type="password" placeholder="Password" />
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

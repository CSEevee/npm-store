import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Icons } from "@/components/ui/icons"

//   {/* {testPackages.map((package, index) => {
//             return (<NpmItem 
//                 id={package._id} 
//                 name={package.name}
//                 version={package.version}
//                 time={package.time}
//                 repository={package.respository}
//                 />)

// type Packages = {
//     id= number; 
//     name={package.name}
//     version={package.version}
//     time={package.time}
//     repository={package.respository}
// }
 
export function NpmItem({...props}) {
    console.log(props);
  return (
    <Card className="w-[350px] sm:grid-cols-2">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.version} - Public - Published {props.time}</CardDescription>
      </CardHeader>
      <CardContent>
       <p className="text-slate-400 font-semibold ">Repository</p>
       <a href={props.repository} className="font-semibold">{props.repository}</a>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Remove</Button>
        <Button>Registery Page</Button>
      </CardFooter>
    </Card>
  )
}
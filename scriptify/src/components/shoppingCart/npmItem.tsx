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

function timeDifference(current: number, previous: number) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function registeryURL(name: string) {
  return "https://www.npmjs.com/package/" + name;
}


export function NpmItem({...props}) {
    const currDate = new Date().getTime();
    const pubDate = new Date(props.date).getTime();
    const time = timeDifference( currDate, pubDate);
    const npmURL = registeryURL(props.name);

  return (
    <Card className=" sm:grid-cols-2">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.version} - Public - Published {time}</CardDescription>
      </CardHeader>
      <CardContent>
       <p className="text-slate-400 font-semibold ">Repository</p>
       <a href={props.repository} target="_blank" className="font-semibold">{props.repository}</a>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Remove</Button>
        <a href={npmURL} target="_blank">
        <Button >Registery Page</Button>
        </a>
      </CardFooter>
    </Card>
  )
}
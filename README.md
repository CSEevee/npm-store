# Scriptify: NPM Tool To Generate a Single NPM Command to Install Multiple Dependencies

Have you ever had to install dependencies, and you had to install each package one at a time?

Have you ever had to routinely start projects from scratch, and you have a notes folder filled with npm commands depending on the project type?

Leverging the [NPM registry API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md), Scriptify allows users to browse the NPM registry, select packages, and generate a NPM install command to install selected packages in bulk. 

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, TypeScript, React, Shadcn, Tailwind, Jotai, Axios, Express, Vite, Supabase(SQL)

**Client**

Time was a factor in our decision in using React and Shadcn. We had about 14 hours (over 3 days) to build our application, so speed was a requirement when considering how to construct our front end. React allowed our team to quickly construct the general component structure, and Shadcn's UI library was chosen because of it's "out-of-the-box" styled components when put together made a user friendly application. By utilizing React and Shadcn, it allowed our team to focus on setting up the logic of transforming the NPM registry data into a "shopping" experience in order to generate a NPM install command. 

**Server**

Vite was used for our development server due to it's ability to spin up project with minimal amount of boilerplate and configuration. In order to connect our Vite Client application to our database, we set up an Express server. Express was chosen as a secondary server focused on databases because of its flexibility with creating routes and middleware depending on the request from our frontend. Our Express server does a lot of heavy lifting when it comes to querying our database and authenticating users as well as generating cookies. By having our database queries within Express, it kept our frontend code less cluttered and focused on the visual user experience.

**Database**

Our team wanted to be focus on the logic transfroming the NPM registry data, and needed a SQL database hosted remotely that had a quick set up time. We used the Supabase API in order to connect to our database, and used the [supabase npm package](https://www.npmjs.com/package/@supabase/supabase-js) to query data.

## Roadmap for Future Features

- Favorites Page
- Saved Previous Checkouts Page
- UI improvements

## Lessons Learned:

- How to utilize two servers for the same application
- How to use localStorage as a way to cache user's selections
- How to use a non-dependency UI component library
- How the NPM registry is set up and maintained

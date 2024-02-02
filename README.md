# Backend for Movies FullStack APP

Command for the backend

npm init -y
git init
touch .gitignore -> .env, node_modules
touch README.md
npm i express cors dotenv morgan mongodb
npm i --save-dev nodemon
! don't forget nodemon - globally or locally

"type" : "module" !! don't forget about it
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js", - npm start - to deploy the app
    "dev": "nodemon index.js" - npm run dev - to run the app
  },
touch index.js

-------------------------------------------------------------------------
index.js file

const app = express()
const PORT = process.env.PORT || 4000;


// middlewares
app.use(cors()); // allows frontend to connect to backend
app.use(morgan("dev")); //logger - info about the request
app.use(express.json()); // for data in req.body
app.use(express.urlencoded({extended: true})) // allow data in url string

app.get('/', (req, res) => {
    res.send('backend...')
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
----------------------------------------------------------------------
create a file in the backend folder -> loadEnv.js

import dotenv from 'dotenv'
dotenv.config();

-- import './loadEnv.js' in the index.js file
---------------------------------------------------------------------

create a file in the backend folder -> .env

ATLAS_URI = "mongodb+srv://patriciamariamrsn:turbuleasa123456@cluster0.wd4qsli.mongodb.net/sample_training?retryWrites=true&w=majority"
PORT = 4000

index.js - console.log(process.env.ATLAS_URI) - check if everything is working
---------------------------------------------------------------------

create a db folder - conn.js file inside

MongoDB:

ATLAS_URI = "mongodb+srv://patriciamariamrsn:turbuleasa123456@cluster0.wd4qsli.mongodb.net/?retryWrites=true&w=majority"
PORT = 4000

-whitout the name of sample_training

import {MongoClient} from 'mongodb';
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;

try {
    conn = await client.connect();
    console.log("Connected to mongodb")
} catch(e) {
    console.error(e);
}

const db = conn.db("sample_training");
export default db;


Moongose

ATLAS_URI = "mongodb+srv://patriciamariamrsn:turbuleasa123456@cluster0.wd4qsli.mongodb.net/sample_trainig?retryWrites=true&w=majority"
PORT = 4000

?name of the database

import mongoose from 'mongoose';

export async function conn() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log('Connected to MongoDB')
    } catch(error) {
        console.log(error.message);
    }
}

----------------------------------------------------------------------

create a routes folder -> movies.js file in the backend folder
//we start to define our routes

import {Router} from 'express';
import db from '../db/conn.js'; - I don't think we need this for mongoose ( search in the other .txt file)

const router = new Router();

/**
 * GET /
 */

router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("movies"); - enter into the movies collection
    const movies = await collection.find().toArray(); - querry all the movies
    const topTen = movies.slice(0, 10); - select just 10
    res.status(200).json(topTen);

  } catch (error) {
    console.log(error);
  }
});

export default router;

in the index.js :

import moviesRouter from './routes/movies.js'
// after middlewares
app.use("/api/movies", moviesRouter)

test in PostMan - http://localhost:4000/api/movies

-----------------------------------------------------------------------------------

WE NEED TO OPEN ANOTHER TERMINAL - DON'T CLOSE THE TERMINAL FOR THE BACKEND (+ SIGN)
 - we need to be in the main folder - movies-fullstack
 - run the command : npx create-react-app frontend - TO CREATE THE FRONTEND FOLDER
 - cd frontend/
 - npm start => should display the React APP in the web

 - go to App.js - delete the header section entirely and the logo
 - test in the browser adding <h1>something to display</h1>

 useEffect - to communicate with external data - like our API we just created

 -----------------------------------------------------------------------------

 in the APP.js
 import {useEffect, useState} from 'react'

 --INFO--
 useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);

//two parameters - function(arrow function), scnd one is optional - [] array of dependecies - 99% we are going to use it
// if we pass only the arrow function - useEffect runs every time the component is re-rendered.
// if we pass both parameters - runs only the first time the component renders
// if we pass values in the array - runs only the first time the component renders and also when the values inside the array changed since the last render

App.js

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //useEffect -always on the top
  
  useEffect(() => {
    //connect to the backend
    //async function inside the useEffect - we can not use useEffect((async function))!!
    //useEffect makes the request as soon as the App component renders to the browser( as soon as the application loads); doesn't wait for the user interaction(click a button or something else)

    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/movies");
      const data = await res.json();
      console.log(data);
    };
    //call the function after the definition
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Movies fullstack app</h1>
    </div>
  );
}

export default App;

--------------------------------------------------------------------

create a components folder - MoviesList and MoviesItem
- import them to the App.js

---------------------------------------------------------------------

Create Routes 
- nextjs or vite - more performant than creating npx create-react-app
- if we use npx create ... we need to install the routes by ourselves

- command: npm install react-router-dom
- command: npm start : to run the frontend again

in the frontend - index.js :
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

Now, the App is the child of the BrowserRouter - we have all the functionalities behind the scene.

in the App.js

import {Routes, Route} from 'react-router-dom';

 return (
    <div className="App">
      <h1>Movies fullstack app</h1>

      <Routes>
        <Route path="/movies" element={<MoviesList movies={movies} />} />
      </Routes>
    </div>
  );
}

element - to display the component
path - to set the url - what do we want to render at this url - we conditionally render the component based on the path

Create a pages folder inside the frontend folder
Create a MainPage component
Render the MainPage inside the router path="/" element={MainPage}

Create a Navbar inside the pages folder - to Link the pages
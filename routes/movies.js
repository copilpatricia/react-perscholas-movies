import { Router } from "express";
import {ObjectId} from 'mongodb'
import db from "../db/conn.js";


const router = new Router();
/**
 * GET /
 */
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("movies");

    const movies = await collection.find().limit(10).toArray();
    // const topTen = movies.slice(0, 10);
    res.status(200).json(movies); //logs topTen before - but in this way is faster
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /:id
 */

router.get("/:id", async(req, res) => {
  try {
    const collection = await db.collection("movies");
    const query = new ObjectId(req.params.id)

    const movie = await collection.findOne({_id: query})
    res.status(200).json(movie)
  } catch (error) {
    console.log(error);
  }
})

export default router;

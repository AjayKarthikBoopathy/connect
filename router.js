import express from "express";


const router = express.Router();
import { search } from "./controller.js";
import { getGenre } from "./amazon1.js";



router.get("/products", search)
router.post("/products", getGenre)




export default router;
import express from "express";

const router = express.Router();

// import controllers
import {form,getAppContact} from "../Controller/form.js"

router.post("/contact",form);
router.get("/getallcontact",getAppContact)
export default router;
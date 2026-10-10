import Router from "express";
import z from "zod";
import {
  generateAccessToken,
  getById,
  signIn,
  signUp,
} from "./auth.service.js";
import { auth } from "../../common/middleware/index.js";
import { validation } from "../../common/service/validation.service.js";
import { userLogicSchema } from "./auth.validation.js";
const router = Router();

router.post("/signUp", async (req, res) => {
  let data = await signUp(req.body);
  res.json(data);
});
router.post("/signIn", validation(userLogicSchema), async (req, res) => {
  let data = await signIn(req.body);
  res.json(data);
});
router.get("/getById", auth, async (req, res) => {
  let data = await getById(req.user.id);
  console.log(req.user.id);

  res.json(data);
});

router.post("/generate_access_token", async (req, res) => {
  let data = await generateAccessToken(req.body);
  res.json(data);
});

export default router;

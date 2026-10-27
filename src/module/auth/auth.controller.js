import Router from "express";
import z from "zod";
import {
  generateAccessToken,
  getAllUsers,
  getById,
  signIn,
  signUp,
  verifyAccount,
} from "./auth.service.js";
import { auth } from "../../common/middleware/index.js";
import { validation } from "../../common/service/validation.service.js";
import { userLogicSchema } from "./auth.validation.js";
import { checkRole } from "../../common/middleware/checkRole.js";
import { upload } from "../../common/middleware/multer.js";
const router = Router();

router.post("/signUp", upload().single("image"), async (req, res) => {
  let data = await signUp(req.body, req.file);
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
router.put("/verifyAccount", async (req, res) => {
  let data = await verifyAccount(req.body);
  res.json(data);
});
router.get("/getAllUsers", auth, checkRole(["1"]), async (req, res) => {
  let data = await getAllUsers();
  res.json(data);
});

export default router;

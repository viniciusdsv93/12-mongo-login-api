import { Router } from "express";
import { createUser, getUserInfo, loginUser } from "../controllers/user-controller";
import { decodeToken } from "../middlewares/decode-token";

const router = Router();

router.get("/test", (request, response) => {
	response.status(200).json({ status: "ok" });
});

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/user/:id", decodeToken, getUserInfo);

export { router };

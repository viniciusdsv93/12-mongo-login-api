import { Request, Response } from "express";
import {
	createUserService,
	getUserInfoService,
	loginUserService,
} from "../services/user-service";

async function createUser(request: Request, response: Response) {
	try {
		const requiredFields = ["email", "password", "confirmPassword"];

		for (const field of requiredFields) {
			if (!request.body[field]) {
				return response
					.status(400)
					.json({ ok: false, message: `field ${field} is required` });
			}
		}

		if (request.body.password !== request.body.confirmPassword) {
			return response.status(400).json({
				ok: false,
				message: "password and password confirmation did not match",
			});
		}

		await createUserService(request, response);
	} catch (error) {
		console.log("error", error);
		return response
			.status(500)
			.json({ ok: false, message: "internal server error", data: error });
	}
}

async function loginUser(request: Request, response: Response) {
	try {
		const requiredFields = ["email", "password"];

		for (const field of requiredFields) {
			if (!request.body[field]) {
				return response
					.status(400)
					.json({ ok: false, message: `field ${field} is required` });
			}
		}

		await loginUserService(request, response);
	} catch (error) {
		console.log("error", error);
		return response
			.status(500)
			.json({ ok: false, message: "internal server error", data: error });
	}
}

async function getUserInfo(request: Request, response: Response) {
	try {
		if (!request.params.id) {
			return response.status(400).json({ ok: false, message: "id is required" });
		}

		await getUserInfoService(request, response);
	} catch (error) {
		console.log("error", error);
		return response
			.status(500)
			.json({ ok: false, message: "internal server error", data: error });
	}
}

export { createUser, loginUser, getUserInfo };

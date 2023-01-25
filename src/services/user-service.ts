import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUserService(request: Request, response: Response) {
	try {
		const { email, password } = request.body;

		const userAlreadyExists = await UserModel.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return response.status(400).json({
				ok: false,
				message: `email ${request.body.email} already in use`,
			});
		}

		const hashedPassword = await bcrypt.hash(
			password,
			Number(process.env.BCRYPT_SALT)
		);

		const newUser = await UserModel.create({ email, password: hashedPassword });

		if (newUser) {
			return response.status(201).json({
				ok: true,
				message: `User of id ${newUser._id} successfully registered`,
				data: newUser,
			});
		}
	} catch (error) {
		console.log(error);
	}
}

async function loginUserService(request: Request, response: Response) {
	const { email, password } = request.body;

	const user = await UserModel.findOne({ email });

	if (!user) {
		return response.status(400).json({ ok: false, message: "invalid credentials" });
	}

	if (bcrypt.compareSync(password, user.password)) {
		const token = jwt.sign(user._id.toString(), `${process.env.JWT_SECRET}`);

		const userWithToken = await UserModel.findOneAndUpdate(
			{ _id: user._id },
			{ jwt: token }
		);

		if (!userWithToken) {
			return response
				.status(500)
				.json({ ok: false, message: "error when generating new token" });
		}
		return response.status(200).json({ ok: true, message: "access granted", token });
	}
	return response.status(400).json({ ok: false, message: "invalid credentials" });
}

async function getUserInfoService(request: Request, response: Response) {
	const user = await UserModel.findById(request.params.id);
	return response.status(200).json({ ok: true, data: user });
}

export { createUserService, loginUserService, getUserInfoService };

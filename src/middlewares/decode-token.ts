import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function decodeToken(request: Request, response: Response, next: NextFunction) {
	try {
		if (!request.headers.authorization) {
			return response
				.status(403)
				.json({ ok: false, message: "unauthenticated user" });
		}

		const token = request.headers.authorization.split(" ")[1];

		const verifiedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);

		if (verifiedToken !== request.params.id) {
			return response
				.status(403)
				.json({ ok: false, message: "unauthenticated user" });
		}

		next();
	} catch (error) {
		return response
			.status(500)
			.json({ ok: false, message: "internal server error", data: error });
	}
}

export { decodeToken };

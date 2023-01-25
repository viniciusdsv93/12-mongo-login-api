import { app } from "./app/app";
import dotenv from "dotenv";
import { connect, disconnect } from "./models/connection";
dotenv.config();

const PORT = process.env.PORT || 3333;

connect()
	?.then(() => {
		console.log("Successfully connected to database");
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((error) => {
		console.log("Could not connect to database:", error);
	});

process.on("exit", async () => {
	await disconnect();
});

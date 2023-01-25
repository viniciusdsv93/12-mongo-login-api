import mongoose from "mongoose";

function connect() {
	try {
		mongoose.set("strictQuery", true);
		return mongoose.connect(`${process.env.MONGO_URL}`);
	} catch (error) {
		console.log(error);
	}
}

async function disconnect() {
	await mongoose.disconnect();
	console.log("Successfully disconnected to database");
}

export { connect, disconnect };

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		jwt: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };

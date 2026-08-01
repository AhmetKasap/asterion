import { Schema, model, Document } from "mongoose"

export interface UserDocument extends Document {
	name: string
	email: string
	password: string
	role: string
	createdAt: Date
	updatedAt: Date
}

const UserSchema = new Schema<UserDocument>(
	{
		name: {
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true,
			unique: true
		},

		password: {
			type: String,
			required: true
		},

		role: {
			type: String,
			required: true,
			enum: ["user", "admin"]
		}
	},
	{
		timestamps: true
	}
)

export const UserModel = model<UserDocument>("User", UserSchema)

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true, // Email має бути унікальним
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model("User", UserSchema);
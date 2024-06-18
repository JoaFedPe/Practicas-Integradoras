import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart:asdasda,//hacer lo del populate para asociar una id de un carrito al usuario
    rol: String
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection
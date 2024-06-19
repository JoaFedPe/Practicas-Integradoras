import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart: {
        type:[
            {
                carrito:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Carts"
                }
            }
        ]
    },
    rol: String
});

userSchema.pre('findOne', function(){
    this.populate('cart.carrito')
})

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection
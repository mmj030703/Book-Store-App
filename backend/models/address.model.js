import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    address1: {
        type: String,
        required: true,
        trim: true
    },
    address2: {
        type: String,
        trim: true,
        default: null
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

export default Address;
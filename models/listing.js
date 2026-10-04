const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    image: {
        type: String,
        default: "https://images.unsplash.com/..."
    },

    price: Number,

    location: String,

    country: String,

    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model("Listing", listingSchema);
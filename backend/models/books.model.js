import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        summary: {
            type: String,
            required: true,
            trim: true
        },
        detailedDescription: {
            type: String,
            required: true,
            trim: true
        },
        authorNote: {
            type: String,
            trim: true,
            default: null
        }
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^[0-9]{13}$/,
            'Invalid ISBN format'
        ]
    },
    pages: {
        type: Number,
        required: true,
        min: [0, "Pages cannot be negative !"]
    },
    language: {
        type: String,
        enum: [
            "English",
            "Spanish",
            "French",
            "German",
            "Italian",
            "Portuguese",
            "Russian",
            "Chinese",
            "Japanese",
            "Hindi",
            "Arabic",
            "Dutch",
            "Korean",
            "Turkish",
            "Swedish"
        ],
        required: true,
        trim: true
    },
    originCountry: {
        type: String,
        required: true,
        enum: [
            "United States",
            "United Kingdom",
            "Canada",
            "Australia",
            "India",
            "Spain",
            "Mexico",
            "Argentina",
            "Colombia",
            "Chile",
            "France",
            "Belgium",
            "Switzerland",
            "Ivory Coast",
            "Germany",
            "Austria",
            "Italy",
            "Portugal",
            "Brazil",
            "Russia",
            "Belarus",
            "Ukraine",
            "China",
            "Taiwan",
            "Singapore",
            "Japan",
            "Egypt",
            "Saudi Arabia",
            "United Arab Emirates",
            "Lebanon",
            "Morocco",
            "Netherlands",
            "South Korea",
            "Turkey",
            "Sweden"
        ]
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    ],
    bookImages: [
        {
            type: String,
            required: true
        }
    ],
    coverImage: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Price cannot be negative !"]
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Stock cannot be negative !"]
    }
}, { timestamps: true });


// Validator for categories field in bookSchema
bookSchema.path('categories').validate(function (value) {
    return value && value.length > 0
}, "A book should have atleast one category !");

// Validator for bookImages field in bookSchema
bookSchema.path('bookImages').validate(function (value) {
    return value && value.length > 0
}, "A book should have at least one image !");

const Book = mongoose.model('Book', bookSchema);

export default Book;
import User from "../models/users.model.js";
import Address from "../models/address.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password, address, role } = req.body;
        const addressObj = JSON.parse(address);

        // if the fields are empty
        if (
            [username, firstName, lastName, email, password, addressObj, role]
                .some(value => {
                    if (value.typeOf === "string" && (!value || !value.trim())) {
                        return value;
                    } else if (value.typeOf === "object" && !value) {
                        return value;
                    }
                })
        ) {
            return res.status(400).json("Fields:: All fields are required !");
        }

        // Validating address
        for (const [addressField, addressValue] of Object.entries(addressObj)) {
            if (addressField === "address2") {      // check for present then continue
                continue;
            }

            if (addressValue.trim() === "") {
                return res.status(400).json(`Address:: ${addressField} is required !`);
            }
        }

        // Email Validation
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json("Email:: Invalid Email format !");
        }

        // Validating role value again enum ("user", "admin")
        if (!["admin", "user"].includes(role)) {
            return res.status(400).json("Role:: Role should be either admin or user !");
        }

        // Validating avatar image
        const avatarImage = req?.files?.avatar;
        if (!avatarImage || !avatarImage[0]?.path) {
            return res.status(400).json("Avatar:: Avatar image is required !");
        }

        // Validating user image image
        const userImage = req?.files?.userImage;
        if (!userImage || !userImage[0]?.path) {
            return res.status(400).json("User Image:: User image is required !");
        }


        // Upload images to cloudinary
        const avatarPath = await uploadOnCloudinary(avatarImage[0]?.path);
        const userImagePath = await uploadOnCloudinary(userImage[0]?.path);

        // Already exist user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json("User already exist !");
        }

        // Username already taken
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json("Username already taken !");
        }

        // Creating address document 
        const addressDocument = await Address.create({
            address1: addressObj?.address1,
            address2: addressObj?.address2 ? addressObj?.address2 : null,
            pincode: addressObj?.pincode,
            city: addressObj?.city,
            state: addressObj?.state
        });

        if (!addressDocument) {
            return res.status(400).json("An error occurred while creating address document !");
        }

        // Registering user 
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password,
            address: addressDocument._id,
            role,
            avatar: avatarPath?.url,
            userImage: userImagePath?.url
        });

        if (!user) {
            const deletedAddress = await Address.findByIdAndDelete(addressDocument._id);
            return res.status(400).json("An error occurred while creating user !");
        }

        res.status(201).send({ status: true, message: "User created successfully !", data: user });

    } catch (error) {
        return res.status(500).json(`Internal Server Error ${error}`);
    }
}

// Sample method to test
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).send({ message: "User found successfully!", data: user });
    } catch (error) {
        return res.status(500).json("Internal Error Occurred");
    }
}
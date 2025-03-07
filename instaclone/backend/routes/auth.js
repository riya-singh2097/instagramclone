const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SIGNUPUSER = mongoose.model("SIGNUPUSER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwt_secret} = require("../keys");//by using this we will send a token to user when it will sigin so when signin will be successfull we willsend this
const requirelogin = require("../middleware/requirelogin");

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/signup", async (req, res) => {
    try {
        const { username, password, confirmpassword } = req.body;

        // 1️⃣ Validate input fields
        if (!username || !password || !confirmpassword ) {
            return res.status(422).json({ error: "Please add all the fields" });
        }

        // 2️⃣ Check if passwords match
        if (password !== confirmpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        // 3️⃣ Check if user already exists
        const existingUser = await SIGNUPUSER.findOne({ username });
        if (existingUser) {
            return res.status(422).json({ error: "User already exists" });
        }

        // 4️⃣ Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 5️⃣ Create and save the user (excluding confirmPassword)
        const user = new SIGNUPUSER({
            username,
            password: hashedPassword,
            confirmpassword 
        });

        await user.save();
        return res.status(201).json({ message: "Signup successful!" });
         

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1️⃣ Validate input fields
        if (!username || !password) {
            return res.status(422).json({ error: "Please enter both username and password" });
        }

        // 2️⃣ Check if user exists
        const existingUser = await SIGNUPUSER.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ error: "user doent exist" });
        }
console.log("user:",existingUser);
        // 3️⃣ Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid  password" });
        }

        // 4️⃣ Successful login
        // return res.status(200).json({ message: "Login successful!" });
        //sending token if succesful login
        const token = jwt.sign({_id:existingUser.id},jwt_secret);//by using id and secret key a token is made by jwt
        console.log(token);
        console.log(existingUser.id);
        // res.status(200).json({ message: "Login successful!" });
        res.json(token);//we will save this in local storage later
        //by using this token we will make a middleware for verification - here its MIDDLEWARE FOLDER
       
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/createpost',requirelogin,(req,res)=>{//requirelogin is middleware
console.log("auth function");
})


module.exports = router;

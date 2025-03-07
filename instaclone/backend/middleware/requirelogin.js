// const jwt = require("jsonwebtoken");
// const {jwt_secret} = require("../keys");
// const mongoose = require("mongoose");//to fetch id from mongo db
// const USER = mongoose.model("SIGNUPUSER");

// module.exports=(req,res,next)=>{

//     const {authorization} =  req.headers;//request has header has authorization
//     //when we will send the request from createpostin headers we have to keep in mind about autorization variable in fetch/geaders
//     if(!authorization){
//         return res.status(401).json({error:"1 you have not logged in"})
//     }
//     // res.json("ok");
//     //in authorization we have to follow a syntax 
//     // it it Bearer then "token"
//     const token = authorization.replace("Bearer ","");//replace bearer with empty string after fetching token
//     jwt.verify(token,jwt_secret,(err,payload)=>{
//         if(err){
//             return res.status(401).json({error:"2 you have not logged in"})
//         }
//         const {_id} = payload;// the data that payload is bringing fetch id variable
//         //verify with mongo which user is this by id
//         USER.findOne(_id).then(userData=>{
//             console.log(userData)
//         })
//     })
//     next();//for further code to run after middleware
// }


const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("SIGNUPUSER");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "1 you have not logged in" });
    }
    console.log("Authorization Header:", authorization);
    
    const token = authorization.replace("Bearer ", ""); // Ensure correct token format
    console.log("Extracted Token:", token);

    jwt.verify(token, jwt_secret, async (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "2 you have not logged in" });
        }
        // console.log("Decoded JWT Payload:", payload);

        const { _id } = payload;

        try {
            const userData = await USER.findOne({ _id }); // Correct MongoDB query
            console.log(userData);
            if (!userData) {
                return res.status(401).json({ error: "User not found" });
            }

            req.user = userData; // Store user data in request
            next(); // Call next only after user is found
        } catch (error) {
            return res.status(500).json({ error: "Server error" });
        }
    });
};

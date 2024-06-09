/* eslint-env node */
import "./backend.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.js";
// this is how we're getting our tokens to work
import config from "./config.js";

// create a new token
function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            config.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

// add a new user to the database
export function registerUser(req, res) {
    const {
        username,
        pwd,
        language,
        bold,
        default_view,
        polytime,
        secret_setting1,
        secret_setting2
    } = req.body; // from form

    if (!username || !pwd) {
        res.status(400).send("Bad request: Invalid input data.");
    } else {
        User.findOne({ username: username })
            .then((existingUser) => {
                if (existingUser) {
                    res.status(409).send("Username already taken");
                } else {
                    bcrypt
                        .genSalt(10)
                        .then((salt) => bcrypt.hash(pwd, salt))
                        .then((password) => {
                            const userToAdd = new User({
                                username,
                                password,
                                language,
                                bold,
                                default_view,
                                polytime,
                                secret_setting1,
                                secret_setting2
                            });
                            return userToAdd.save();
                        })
                        .then((savedUser) => {
                            return generateAccessToken(username).then(
                                (token) => {
                                    console.log("Token:", token);
                                    res.status(201).send({
                                        token: token,
                                        userId: savedUser._id
                                        // gonna get saved settings from here
                                    });
                                }
                            );
                        })
                        .catch((err) => {
                            console.error(
                                "Error saving user or generating token:",
                                err
                            );
                            res.status(500).send("Internal server error");
                        });
                }
            })
            .catch((err) => {
                console.error("Error checking existing user:", err);
                res.status(500).send("Internal server error");
            });
    }
}

// check if the user is in the database
export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received");
        res.status(401).end();
    } else {
        jwt.verify(token, config.env.TOKEN_SECRET, (error, decoded) => {
            if (decoded) {
                console.log("Data retrieved");
                next();
            } else {
                console.log("JWT error:", error);
                res.status(401).end();
            }
        });
    }
}

// authenticate a user
export function loginUser(req, res) {
    const { username, pwd } = req.body; // from form
    User.findOne({ username: username })
        .then((retrievedUser) => {
            if (!retrievedUser) {
                // invalid username
                res.status(401).send("Unauthorized");
            } else {
                bcrypt
                    .compare(pwd, retrievedUser.password)
                    .then((matched) => {
                        if (matched) {
                            generateAccessToken(username).then((token) => {
                                res.status(200).send({
                                    token: token,
                                    userId: retrievedUser._id
                                });
                            });
                        } else {
                            // invalid password
                            res.status(401).send("Unauthorized");
                        }
                    })
                    .catch(() => {
                        res.status(401).send("Unauthorized");
                    });
            }
        })
        .catch((err) => {
            console.error("Error logging in user:", err);
            res.status(500).send("Internal server error");
        });
}

export default {
    generateAccessToken,
    registerUser,
    authenticateUser,
    loginUser
};

import User from "../model/User.js";
import express from 'express'


const route = express.Router()
const secret = process.env.JWT_SECRET;
const expiration = '2h'; // Token will be valid for 2 hours

route.post('/post/register', async (req, res) => {
    try {
        //this checks if an email is in the database 
        const userEmail = await User.findOne({ email: req.body.email });
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
        };
        const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
        res.json({ token, user });
        if (userEmail) {
            let token = req.headers.authorization;
            if (token) {
                token = token.split(' ').pop().trim();
            }

            if (!token) {
                return res.status(401).json({ message: 'No token found!' });
            }

            try {
                // The decoded object will contain the original payload ({ data: { _id, ... } })
                const { data } = jwt.verify(token, secret, { maxAge: '2h' });
                req.user = data; // Attach user data to the request object
            } catch {
                return res.status(401).json({ message: 'Invalid token!' });
            }

            // Proceed to the next middleware or route handler
            next();
            console.log('This email is taken')
            //respond sends data to server
            return res.status(400).json({ error: "email already exists" })
        }
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)

    }
    catch (error) {
        console.error("Failed to create user", error)
        res.status(400).json({ error: "could not create new user", details: error.message })
    }
})



export default route;
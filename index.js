import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import route from './routes/login.js'
import User from './model/User.js'
import 'dotenv/config'
const URI = process.env.MONGO_URI
mongoose.connect(URI)
.then(() =>{
    console.log('Mongoose is running')
})
.catch((error) =>{
    console.error("Connection error", error)
})

const app = express()
const port = 3000
app.use(express.json())
app.use('/', route)

app.listen(port, () => {
    console.log('server is running on port: ' + port)
})


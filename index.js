import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'

const app = express()
const port = 3000

app.get('/', (req,res) =>{
    app.send('hello')
})

app.listen(port, () => {
    console.log('server is running on port: ' + port)
})


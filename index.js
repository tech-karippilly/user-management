import app from './app.js'
import connectDB from './config/db.js'


connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.HOST_URL}:${process.env.PORT}`)
})
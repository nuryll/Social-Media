const express =  require("express"); 
const app =  express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

//Connected MongoDB with .env file.
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });


    //Middleware
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));

    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/posts", postRoute);


app.listen(8800,()=>{
    console.log("Backend server is running on port 8800");
})
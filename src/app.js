import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import dotenv from "dotenv"
import __dirname from "./utils.js"

import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ encoded: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("DB is connected"))
    .catch((error)=> console.log(error))

    app.get("/", (req, res)=>{
        res.render("home")
    })

    app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en el puerto ${PORT}`)
    })

app.use("/api", productRouter)
app.use("/api", cartRouter)
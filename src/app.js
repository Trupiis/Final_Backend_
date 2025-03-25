import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import dotenv from "dotenv"
import __dirname from "./utils.js"
import methodOverride from "method-override";
import path from "path";
import expressSession from "express-session"; 


import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import orderRouter from "./routes/orders.router.js"
import viewsRouter from "./routes/views.router.js"
import productViewRouter from "./routes/productsView.router.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ encoded: true }));
app.use(methodOverride("_method"));


app.engine("handlebars", handlebars.engine());
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

console.log("Ruta absoluta de views:", __dirname + "/views");

app.use(expressSession({
    secret: 'mysecret',
    resave: false, 
    saveUninitialized: false,  
    cookie: { secure: true }  
  }));
  

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("DB is connected"))
    .catch((error)=> console.log(error))

    app.get("/", (req, res) => {
        res.render("home");
    });

    app.use("/api/products", productRouter) //
    app.use("/api/orders", orderRouter)
    app.use("/carts", cartRouter)

    app.use("/", viewsRouter) //
    
    app.use("/", productViewRouter)

    app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en el puerto ${PORT}`)
    })

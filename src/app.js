const path = require("path")
const express = require("express")
const hbs = require("hbs")
const request= require("request")
const geoloc = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")


// console.log(__dirname)
// console.log(__filename)


const app = express()

// Define paths for express config
const Publicdirectory = path.join(__dirname,"../Public")
const viewdirectory = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")

// Setup static directory to serve
app.use(express.static(Publicdirectory))                            // including static files

// Setup handlebar and view engine
app.set("view engine","hbs")
app.set("views",viewdirectory)
hbs.registerPartials(partialspath)

// Display info
app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather",
        name: "Anchal Verma"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title: "HELP",
        Content: "How can i help u",
        name:"Anchal Verma"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"Node js course",
        name:"Anchal Verma",
       
    })
})


app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({error:"Item not found"})
    }
    console.log(req.query.search)
    res.send({products:[]})
})

app.get("/Weather",(req,res)=>{
    if(!req.query.address){
        res.send({error: "Please provide the address"})
    }
    else{
        geoloc(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send(error)
            }
            
            forecast(latitude, longitude,(error,forecastdata)=>{
                if(error){
                    return res.send(error)
                }
                res.send({forecast: forecastdata,
                    location,
                    address: req.query.address})
                
            })
        })    
        // console.log(req.query.address)
        // res.send([{address:req.query.address,forecast:"Clear Sky"}])
    }
    
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"Error 404",
        error:"Help page not found",
        name:"Anchal Verma"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"My 404 page",
        error:"page dosent exist",
        name:"Anchal Verma"
    })
})

// --------------------------------------------------------------------------------------------------------------

// app.get("",(req,res)=>{
//     // res.send("Hello Express")
//     res.send("<h1>Weather</h1>")
// })

// app.get("/help",(req,res)=>{
//     res.send({name: "Anchal",age:20})
// })

// app.get("/about",(req,res)=>{
//     res.send("<h2>ABOUT</h2>")
// })

// app.get("/Weather_info",(req,res)=>{
//     res.send([{location:"Lucknow",forecast:"Clear Sky"},{location:"Kanpur",forecast:"Cloudy Sky"}])
// })
// -------------------------------------------------------------------------------------------------------------

app.listen(3000,()=>{
    console.log("Server starting up")
})
const request= require("request")



// Geocode function 

function geocode(address,callback){
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYW5jaGFsLXYiLCJhIjoiY2t5cmZiYXppMHQxaDJubzF3Y2c4YnVoZyJ9.PASZ0ggudMQ85_ehCSYikw"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback({error:"Unable to connect to location"},undefined)
        }
        else if(response.body.features.length===0){
            callback({error:"Unable to find.Try again"},undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
               
            })
        }


    })
}

//-----------------------------------------------------------------------------------------------------------------
module.exports = geocode




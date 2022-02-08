const request = require("request")

// Weather API function 

function forecast(lat,long,callback){
    url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&APPID=422afefbebd4f36a8304168a08d51184&units=us"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback({error:"Weather Service unavailable"},undefined)
        }
        else if(response.body.message){
            callback({error:"Unable to fetch data.try again"},undefined)
        }
        else{
            callback(undefined," Weather: "+response.body.list[0].weather[0].description+". It is currently "+response.body.list[0].main.temp+" degrees. There is "+response.body.list[0].main.humidity+" humidity.")
        }
    })

}

module.exports = forecast
// fetch("http://localhost:3000/Weather?address=kanpur").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.forecast)
//             console.log(data.location)
//             console.log(data.address)
//         }
//     })
// })

const weatherform = document.querySelector("form")
const searchplace = document.querySelector("input")
const content1 =document.querySelector("#content-1")
const content2 =document.querySelector("#content-2")
const content3 =document.querySelector("#content-3")

weatherform.addEventListener("submit",(event)=>{
    event.preventDefault()
    const location = searchplace.value
    console.log(location)
    content1.textContent = "loading...."
    content2.textcontent = " "
    content3.textcontent = " "
    fetch("/Weather?address="+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return content1.textContent = data.error
        }
        else{
            content1.textContent = data.forecast
            content2.textcontent = data.location
            content3.textcontent = data.address
        }
    })
})
})

